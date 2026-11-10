"""Pruebas de seguridad y validación de api-rotadores.

Corre cada caso contra la versión anterior (puerto 3101) y la nueva (3102), sobre un
Postgres LOCAL de prueba (nunca contra la base corporativa), y relee la base con psql.
Requiere usuarios de prueba tadmin/tsup/tprog/trot/trot2/tsin (ver README de pruebas).
Uso: python3 -I pruebas/pruebas_api.py
"""
import json, subprocess, urllib.request, urllib.error, base64, os

BASE, NUEVA = "http://localhost:3101", "http://localhost:3102"
CLAVE = os.environ.get("CLAVE_PRUEBA", "Prueba-local-99")
PSQL = ["/opt/homebrew/opt/postgresql@16/bin/psql", "-h", "/tmp", "-p", "5433", "-U", "postgres", "-d", "rotadores_prueba", "-Atc"]


def sql(q):
    return subprocess.run(PSQL + [q], capture_output=True, text=True).stdout.strip()


def pedir(url, metodo="GET", cuerpo=None, token=None, crudo=None):
    datos = crudo if crudo is not None else (json.dumps(cuerpo).encode() if cuerpo is not None else None)
    h = {"Content-Type": "application/json"}
    if token: h["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, data=datos, headers=h, method=metodo)
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            if "event-stream" in (r.headers.get("Content-Type") or ""): return r.status, "event-stream"
            t = r.read(); return r.status, (json.loads(t) if t else None)
    except urllib.error.HTTPError as e:
        t = e.read()
        try: return e.code, json.loads(t)
        except Exception: return e.code, t.decode()[:120]


def login(api, usuario, clave=CLAVE):
    s, r = pedir(f"{api}/usuarios/login", "POST", {"usuario": usuario, "password": clave})
    return s, r, (r or {}).get("token") if isinstance(r, dict) else None


def tok(api, usuario):
    return login(api, usuario)[2]


def existe(usuario):
    return sql("select count(*) from progreso.usuarios_rotadores where \"Usuario\"='" + usuario + "'")


def id_de(usuario):
    return sql(f"select id from progreso.usuarios_rotadores where \"Usuario\"='{usuario}'")


CONTEO = {"Orden": 101, "Modulo": "M1", "Codigo": "SKU1", "Estibas": 1, "Cajas": 10, "Unidades": 0,
          "FechaVencimiento": "2027-01-31", "Estatus": "OK", "Observaciones": "", "Usuario": "Tmp Rotador",
          "Rol": "Rotador", "Turno": "6-2", "FechaToma": "2026-11-10T08:00:00Z", "Sede": "Tocancipa"}

res = []


def caso(cid, desc, esperado, fn):
    fila = {"id": cid, "desc": desc, "esperado": esperado}
    for nombre, api in (("antes", BASE), ("ahora", NUEVA)):
        try: fila[nombre] = fn(api)
        except Exception as e: fila[nombre] = (0, f"excepción: {e}")
    fila["status"] = "PASS" if fila["ahora"][0] == esperado else "FAIL"
    res.append(fila)


# ---------- Autenticación ----------
caso("A01", "Sin sesión: leer conteos", 401, lambda a: pedir(f"{a}/conteos"))
def a02(a):
    sql("delete from progreso.usuarios_rotadores where \"Usuario\"='intruso'")
    s, r = pedir(f"{a}/usuarios", "POST", {"Nombre": "Intruso", "Usuario": "intruso", "Password": "x", "Rol": "Admin"})
    return s, f"{r} · creado en BD: {existe('intruso')}"
caso("A02", "Sin sesión: crear un usuario Admin", 401, a02)
sql("delete from progreso.usuarios_rotadores where \"Usuario\"='intruso'")
caso("A03", "Sin sesión: cambiar la contraseña de otro", 401, lambda a: pedir(f"{a}/usuarios/{id_de('tsup')}", "PATCH", {"Activo": "Si"}))
caso("A04", "Sin sesión: borrar un conteo", 401, lambda a: pedir(f"{a}/conteos/no-existe", "DELETE"))
caso("A05", "Sin sesión: flujo de eventos", 401, lambda a: pedir(f"{a}/conteos/eventos"))


def a06(a):
    t = tok(NUEVA, "trot")
    d, f = t.split(".")
    datos = json.loads(base64.urlsafe_b64decode(d + "=="))
    datos["rol"] = "Admin"
    falso = base64.urlsafe_b64encode(json.dumps(datos).encode()).decode().rstrip("=") + "." + f
    return pedir(f"{a}/usuarios", token=falso)
caso("A06", "Token alterado (Rotador se pone rol Admin)", 401, a06)

# ---------- Permisos por rol ----------
caso("A07", "Rotador intenta crear usuarios", 403, lambda a: pedir(f"{a}/usuarios", "POST", {"Nombre": "X Y Z", "Usuario": "xyz", "Password": "Abcd1234x", "Rol": "Admin"}, tok(a, "trot")))
sql("delete from progreso.usuarios_rotadores where \"Usuario\"='xyz'")
caso("A08", "Supervisor intenta guardar un conteo", 403, lambda a: pedir(f"{a}/conteos", "POST", CONTEO, tok(a, "tsup")))
caso("A09", "Programador intenta reemplazar resultado-macro", 403, lambda a: pedir(f"{a}/resultado-macro", "PUT", [], tok(a, "tprog")))
caso("A10", "Supervisor lee conteos (permitido)", 200, lambda a: pedir(f"{a}/conteos", token=tok(a, "tsup")))


def a11(a):
    s, r = pedir(f"{a}/conteos", "POST", dict(CONTEO, Usuario="OTRA PERSONA"), tok(a, "trot"))
    q = sql(f"select \"Usuario\" from progreso.conteos where id='{r.get('id')}'") if isinstance(r, dict) else "-"
    return s, f"guardado a nombre de: {q}"
caso("A11", "Rotador guarda conteo (y no puede ponerlo a nombre de otro)", 201, a11)

# ---------- Contraseñas ----------
def a12(a):
    s, r = pedir(f"{a}/usuarios", token=tok(a, "tadmin"))
    con_clave = sum(1 for u in r if "Password" in u) if isinstance(r, list) else "-"
    return s, f"usuarios con contraseña en la respuesta: {con_clave}"
caso("A12", "Listado de usuarios no expone contraseñas", 200, a12)


def a13(a):
    if a == NUEVA:
        sql("update progreso.usuarios_rotadores set \"Password\"='Prueba-local-99' where \"Usuario\"='trot2'")
    s, r, t = login(a, "trot2")
    guardada = sql("select left(\"Password\", 7) from progreso.usuarios_rotadores where \"Usuario\"='trot2'")
    return s, f"token={'sí' if t else 'no'} · en BD queda: {guardada}…"
caso("A13", "Clave vieja en texto: entra y queda cifrada (scrypt)", 200, a13)
caso("A14", "Vuelve a entrar con la clave ya cifrada", 200, lambda a: login(a, "trot2")[:2])
caso("A15", "Usuario con clave pendiente de asignar no entra", 401, lambda a: login(a, "tsin", "__ASIGNAR_CLAVE__")[:2])


def a16(a):
    out = [login(a, "trot", "mala")[0] for _ in range(5)]
    s = login(a, "trot")[0]
    return s, f"5 fallos → {out}; luego la correcta → {s}"
caso("A16", "5 intentos fallidos bloquean (ni la correcta entra)", 429, a16)


def a17(a):
    sql("delete from progreso.usuarios_rotadores where \"Usuario\"='nrot'")
    t = tok(a, "tadmin")
    debil = pedir(f"{a}/usuarios", "POST", {"Nombre": "Nuevo Rot", "Usuario": "nrot", "Password": "1234", "Rol": "Rotador"}, t)[0]
    fuerte = pedir(f"{a}/usuarios", "POST", {"Nombre": "Nuevo Rot", "Usuario": "nrot", "Password": "Rt4821-kmpw", "Rol": "Rotador"}, t)
    guardada = sql("select left(\"Password\",7) from progreso.usuarios_rotadores where \"Usuario\"='nrot'")
    return fuerte[0], f"clave 1234 → {debil}; clave segura → {fuerte[0]}; en BD: {guardada}…"
caso("A17", "Admin crea usuario: rechaza clave débil, guarda la segura cifrada", 201, a17)


def a18(a):
    t = tok(a, "tadmin")
    s = pedir(f"{a}/usuarios/{id_de('nrot')}", "DELETE", token=t)[0]
    return s, f"existe después: {existe('nrot')}"
caso("A18", "Admin elimina usuario (la app lo pedía y la ruta no existía)", 204, a18)
sql("delete from progreso.usuarios_rotadores where \"Usuario\"='nrot'")
def a19(a):
    sql("update progreso.usuarios_rotadores set \"Activo\"='Si' where \"Usuario\"='tadmin'")
    return pedir(f"{a}/usuarios/{id_de('tadmin')}", "PATCH", {"Activo": "No"}, tok(a, "tadmin"))
caso("A19", "Admin no puede desactivarse a sí mismo", 422, a19)
sql("update progreso.usuarios_rotadores set \"Activo\"='Si' where \"Usuario\"='tadmin'")

# ---------- Validación ----------
for cid, desc, cambio in [("V01", "Cajas negativas", {"Cajas": -5}), ("V02", "Fecha de vencimiento imposible", {"FechaVencimiento": "2027-02-30"}),
                          ("V03", "Orden no numérico", {"Orden": "abc"}), ("V04", "Observaciones de 800 caracteres", {"Observaciones": "x" * 800}),
                          ("V05", "Campo con objeto en vez de texto", {"Estatus": {"a": 1}})]:
    caso(cid, desc, 422, lambda a, cambio=cambio: pedir(f"{a}/conteos", "POST", dict(CONTEO, **cambio), tok(a, "trot2")))
caso("V06", "JSON mal formado", 400, lambda a: pedir(f"{a}/conteos", "POST", crudo=b"{malo", token=tok(a, "trot2")))
caso("V07", "resultado-macro que no es lista", 422, lambda a: pedir(f"{a}/resultado-macro", "PUT", {"x": 1}, tok(a, "trot2")))

# ---------- Funcionamiento normal ----------
def f01(a):
    t = tok(a, "trot2")
    url = f"{a}/conteos/eventos" + (f"?token={t}" if t else "")
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=5) as r:
        return r.status, r.headers.get("Content-Type")
caso("F01", "Rotador con sesión recibe el flujo de eventos", 200, f01)


def f02(a):
    t = tok(a, "trot2")
    s = pedir(f"{a}/bloqueos", "POST", {"Orden": 777, "Usuario": "SUPLANTADO", "Turno": "6-2"}, t)[0]
    q = sql("select \"Usuario\" from progreso.bloqueos_edicion where \"Orden\"=777")
    pedir(f"{a}/bloqueos/777", "DELETE", token=t)
    return s, f"bloqueo a nombre de: {q}"
caso("F02", "Bloqueo de posición queda a nombre de la sesión", 201, f02)
caso("F03", "Historial: agregar fila", 201, lambda a: pedir(f"{a}/historial", "POST", CONTEO, tok(a, "trot2")))
caso("F04", "Admin carga conteo a nombre de otro (Excel)", 201, lambda a: pedir(f"{a}/conteos", "POST", dict(CONTEO, Usuario="ROTADOR X"), tok(a, "tadmin")))
caso("F05", "/salud responde sin sesión", 200, lambda a: pedir(f"{a}/salud"))

def f06(a):
    import threading
    t = tok(a, "tadmin") if a == NUEVA else None
    filas = [{"id": f"r{i}", "OrdenMacro": i, "Orden": i, "Modulo": "M", "Codigo": "C"} for i in range(200)]
    out = []
    hs = [threading.Thread(target=lambda: out.append(pedir(f"{a}/resultado-macro", "PUT", filas, t)[0])) for _ in range(4)]
    [h.start() for h in hs]; [h.join() for h in hs]
    return (204 if out and all(x == 204 for x in out) else 500), f"4 envíos simultáneos -> {sorted(out)}"
caso("F06", "resultado-macro: varios dispositivos a la vez (antes chocaban: 500)", 204, f06)

print(json.dumps(res, ensure_ascii=False, indent=1, default=str))
