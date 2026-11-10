-- Esquema de base de datos para "Rotadores Fase 1", adaptado para correr
-- dentro del esquema corporativo "progreso" (Azure Database for PostgreSQL).
--
-- Segun el informe tecnico de Tecnologia (agosto 2026), a diferencia de
-- Roturas, aqui SI corresponde al desarrollador crear y mantener estas
-- tablas dentro de "progreso" una vez Tecnologia confirme que el esquema
-- esta disponible y que la identidad tecnica tiene permisos sobre el.
--
-- Nota: los nombres de columna van con mayuscula inicial ENTRE COMILLAS
-- ("Orden", "Modulo", etc.) porque asi quedo definido el esquema original
-- en Supabase — hay que respetar exactamente esas comillas y mayusculas al
-- consultar, si no Postgres las vuelve minusculas solas y dejan de coincidir.
--
-- Es seguro volver a correrlo (usa "if not exists" en todo, nunca DROP) —
-- no elimina informacion existente. Ejecutar UNA vez conectado a la base
-- corporativa, con la identidad tecnica que entregue Tecnologia, antes de
-- arrancar la API.

create schema if not exists progreso;

create extension if not exists pgcrypto;

create table if not exists progreso.conteos (
  id text primary key default gen_random_uuid()::text,
  "Orden" integer,
  "Modulo" text,
  "Codigo" text,
  "Estibas" numeric,
  "Cajas" numeric,
  "Unidades" numeric,
  "FechaVencimiento" text,
  "Estatus" text,
  "Observaciones" text,
  "Bloquear" text,
  "Usuario" text,
  "Rol" text,
  "Turno" text,
  "FechaToma" text,
  "Sede" text
);

-- Historial: log append-only, misma forma que Conteos, nunca se edita/borra.
create table if not exists progreso.historial (
  id text primary key default gen_random_uuid()::text,
  "Orden" integer,
  "Modulo" text,
  "Codigo" text,
  "Estibas" numeric,
  "Cajas" numeric,
  "Unidades" numeric,
  "FechaVencimiento" text,
  "Estatus" text,
  "Observaciones" text,
  "Bloquear" text,
  "Usuario" text,
  "Rol" text,
  "Turno" text,
  "FechaToma" text,
  "Sede" text
);

-- Bloqueos de edicion: para que dos Rotadores no editen la misma posicion
-- (Orden) al mismo tiempo.
create table if not exists progreso.bloqueos_edicion (
  "Orden" integer primary key,
  "Usuario" text,
  "Turno" text,
  "CreadoEn" timestamptz not null default now()
);

-- Resultado de la macro (respalda la pantalla MPRot): la app lo recalcula
-- en el dispositivo y lo vuelve a guardar aqui completo cada vez que algo
-- cambia, para poder consultarlo directo desde la base sin abrir la app.
create table if not exists progreso.resultado_macro (
  id text primary key,
  "OrdenMacro" integer,
  "Orden" integer,
  "Modulo" text,
  "Familia" text,
  "Codigo" text,
  "Descripcion" text,
  "Estibas" numeric,
  "Cajas" numeric,
  "Unidades" numeric,
  "FechaVencimiento" text,
  "DiasParaVencer" integer,
  "Estado" text,
  "Frescura" numeric,
  "AptoT1" text,
  "AptoT2" text,
  "AptoKA" text,
  "TotalCajas" numeric,
  "TotalUnidades" numeric,
  "Hectolitros" numeric,
  "Estatus" text,
  "Observaciones" text,
  "Usuario" text
);

-- Login unificado (Rotador, Supervisor, Programador, Admin).
create table if not exists progreso.usuarios_rotadores (
  id text primary key default gen_random_uuid()::text,
  "Nombre" text not null,
  "Usuario" text not null unique,
  "Password" text not null,
  "Rol" text not null check ("Rol" in ('Rotador', 'Supervisor', 'Programador', 'Admin')),
  "Activo" text not null default 'Si',
  "CreadoEn" timestamptz not null default now()
);

create index if not exists usuarios_rotadores_usuario_idx on progreso.usuarios_rotadores ("Usuario");
create index if not exists conteos_orden_idx on progreso.conteos ("Orden");
create index if not exists historial_fechatoma_idx on progreso.historial ("FechaToma" desc);
