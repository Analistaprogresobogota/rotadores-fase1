import { useEffect, useState } from 'react';
import { useDatos } from '../../hooks/useDatos';
import { formatoFechaLegible } from '../../utilidades/fechas';
import { calcularIndicadores } from '../../logica/macro';
import { SectionTitle } from '../comunes/SectionTitle';
import { Cargando } from '../comunes/Cargando';
import { ErrorAviso } from '../comunes/ErrorAviso';
import { HistorialTablero } from '../comunes/HistorialTablero';
import { TableroResumen } from '../comunes/TableroResumen';

export function VistaSupervisor({ seccion = 'tablero' }) {
  const { cargando, error, obtenerSkus, obtenerHistorial } = useDatos();
  const [skus, setSkus] = useState([]);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    obtenerSkus().then(setSkus).catch(() => {});
    obtenerHistorial().then(setHistorial).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function filasParaExcel(filas = historial) {
    return filas.map((f) => {
      const sku = skus.find((s) => s.Codigo === f.Codigo) || null;
      const calc = calcularIndicadores(f, sku);
      return {
        Modulo: f.Modulo,
        Codigo: f.Codigo,
        Descripcion: sku?.Descripcion || '',
        Estibas: f.Estibas,
        Cajas: f.Cajas,
        Unidades: f.Unidades,
        'Fecha de vencimiento': f.FechaVencimiento ? formatoFechaLegible(f.FechaVencimiento) : '',
        'Dias para vencer': calc?.diasParaVencer ?? '',
        Observaciones: f.Observaciones || '',
        Estatus: f.Estatus || '',
        'Total cajas': calc?.totalCajas ?? '',
        Bloquear: f.Bloquear === 'Bloquear' ? 'Bloqueado' : 'No',
        Usuario: f.Usuario,
        Rol: f.Rol,
        Turno: f.Turno || '',
        'Fecha de toma': f.FechaToma ? new Date(f.FechaToma).toLocaleString('es-CO') : '',
        Sede: f.Sede,
      };
    });
  }

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      {seccion === 'tablero' && <TableroResumen />}

      {seccion === 'historial' && (
        <div style={{ display: 'grid', gap: 12 }}>
          <SectionTitle icono="🗂️" titulo="Historial" sub="Todo lo capturado desde el inicio, con su tablero acumulado (solo lectura)." />
          <ErrorAviso mensaje={error} />
          {cargando && historial.length === 0 && <Cargando texto="Cargando historial…" />}
          <HistorialTablero historial={historial} skus={skus} filasExcel={filasParaExcel} />
        </div>
      )}
    </div>
  );
}
