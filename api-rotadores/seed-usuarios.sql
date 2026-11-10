-- Usuarios iniciales para "Rotadores Fase 1", mismos que ya existen en
-- Supabase — se corre en DBeaver, DESPUES de schema.sql, contra la base
-- "dbgroot". Es seguro volver a correrlo (usa upsert por "Usuario") y NUNCA
-- sobrescribe contraseñas existentes. Las contraseñas no van aquí: después de
-- correrlo, asignarlas cifradas con:  node scripts/asignar-clave.mjs <usuario>

insert into usuarios_rotadores ("Nombre", "Usuario", "Password", "Rol", "Activo") values
  ('Administrador Piloto', 'admin', '__ASIGNAR_CLAVE__', 'Admin', 'Si'),
  ('Supervisor Piloto', 'supervisor', '__ASIGNAR_CLAVE__', 'Supervisor', 'Si'),
  ('Programador Piloto', 'programador', '__ASIGNAR_CLAVE__', 'Programador', 'Si'),
  ('SAMUEL FELIPE TORRES PINZON', '01', '__ASIGNAR_CLAVE__', 'Rotador', 'Si'),
  ('ARTURO SUSO', '02', '__ASIGNAR_CLAVE__', 'Rotador', 'Si')
on conflict ("Usuario") do update set
  "Nombre" = excluded."Nombre",
  "Rol" = excluded."Rol",
  "Activo" = excluded."Activo";
