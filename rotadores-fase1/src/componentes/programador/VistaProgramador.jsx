import { useEffect, useState } from 'react';
import { useDatos } from '../../hooks/useDatos';
import { calcularIndicadores } from '../../logica/macro';
import { formatoFechaLegible } from '../../utilidades/fechas';
import { descargarExcel } from '../../utilidades/exportarExcel';
import { SectionTitle } from '../comunes/SectionTitle';
import { Cargando } from '../comunes/Cargando';
import { ErrorAviso } from '../comunes/ErrorAviso';
import { TablaCruda } from '../comunes/TablaCruda';
import { ConteosRealizados } from '../comunes/ConteosRealizados';

// Vista de solo lectura del rol Programador: unicamente la hoja de Conteos,
// con boton de descargar Excel. No ve Tablero, Historial ni Resultado de
// la macro (eso lo ve Supervisor/Admin) — a proposito, para que este rol
// solo sirva para consultar/exportar el estado actual.
export function VistaProgramador({ seccion = 'conteos' }) {
  const { cargando, error, obtenerSkus, obtenerConteos } = useDatos();
  const [skus, setSkus] = useState([]);
  const [conteos, setConteos] = useState([]);

  useEffect(() => {
    obtenerSkus().then(setSkus).catch(() => {});
    obtenerConteos().then(setConteos).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Solo estas 11 columnas — a proposito, en el mismo orden de la hoja
  // "Conteos" del Excel real: el Programador descarga esto para pegarlo
  // directo ahi, no debe traer nada mas (ni Estado/Frescura, que tampoco
  // estan aqui, ni los datos de sesion).
  function filasParaExcel() {
    return conteos.map((f) => {
      const sku = skus.find((s) => s.Codigo === f.Codigo) || null;
      const calc = calcularIndicadores(f, sku);
      return {
        Modulo: f.Modulo,
        Código: f.Codigo,
        Descripción: sku?.Descripcion || '',
        Estibas: f.Estibas,
        Cajas: f.Cajas,
        Unidades: f.Unidades,
        'Fecha de vencimiento': f.FechaVencimiento ? formatoFechaLegible(f.FechaVencimiento) : '',
        'Días para vencer': calc?.diasParaVencer ?? '',
        Observaciones: f.Observaciones || '',
        Estatus: f.Estatus || '',
        'Total Cajas': calc?.totalCajas ?? '',
      };
    });
  }

  if (seccion === 'realizados') return <ConteosRealizados />;

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <SectionTitle icono="📋" titulo="Conteos" sub="Estado actual de todas las posiciones (solo lectura)." />
      <ErrorAviso mensaje={error} />
      {cargando && conteos.length === 0 && <Cargando texto="Cargando conteos…" />}
      <button className="boton-secundario boton-descarga" onClick={() => descargarExcel('conteos', filasParaExcel())}>
        ⬇ Descargar conteos en Excel
      </button>
      <TablaCruda filas={conteos} skus={skus} columnasCompletas={false} />
    </div>
  );
}
