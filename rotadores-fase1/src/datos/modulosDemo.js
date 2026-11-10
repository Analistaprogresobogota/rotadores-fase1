// Posiciones fisicas de bodega (Orden/Modulo/Bodega/Fase), embebidas porque
// son datos maestros que casi no cambian. Regenerado desde la hoja "Conteos"
// del Excel real (no existe una hoja "Modulos" aparte: el orden de fila de
// "Conteos" ES el "Orden" de cada posicion) via scripts/actualizar-desde-excel.mjs.
// Ultima actualizacion: 2026-08-18. Corregido 2026-09-22: se consolidaron 41
// modulos que estaban fragmentados en mas de un Orden (mismo modulo fisico
// repetido) — ahora cada posicion fisica tiene un solo Orden; los productos
// adicionales de una posicion mixta viven como varios registros de "conteos"
// bajo ese mismo Orden, no como posiciones separadas.
export const MODULOS_DEMO = [
  {
    "Modulo": "M_A1_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 1,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A1_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 2,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A2_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 3,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A2_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 4,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A3_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 5,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A3_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 6,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A4_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 7,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A4_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 8,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A5_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 9,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A5_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 10,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A6_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 11,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A6_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 12,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A7_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 13,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A7_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 14,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A8_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 15,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A8_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 16,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A9_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 17,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A9_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 18,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A10_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 19,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A10_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 20,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A11_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 21,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A11_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 22,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A12_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 23,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A12_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 24,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A13_DER",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 25,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A13_IZQ",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 26,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A14_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 27,
    "Activo": "Si"
  },
  {
    "Modulo": "M_A14_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 28,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 1_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 29,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 2_DER",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 30,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 2_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 31,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 3_DER",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 32,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 3_IZQ",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 33,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 4 DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 34,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 4 IZQ",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 35,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 5_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 36,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 5 IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 37,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B1_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 38,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B1_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 39,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B2 IZQ",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 40,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B2_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 41,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B3_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 42,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B3_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 43,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B4_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 44,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B4_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 45,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B5_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 46,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B5_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 47,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B6_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 48,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B6_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 49,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B7_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 50,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B7_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 51,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B8_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 52,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B8_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 53,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B9_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 54,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B9_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 55,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B10_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 56,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B10_DER",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 57,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B11_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 58,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B11_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 59,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B12_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 60,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B12_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 61,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B13_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 62,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B13_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 63,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B14_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 64,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B14_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 65,
    "Activo": "Si"
  },
  {
    "Modulo": "M_COLUMNA B",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 66,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B15_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 67,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B15_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 68,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B16_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 69,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B16_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 70,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B17_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 71,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B17_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 72,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B18_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 73,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B18_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 74,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B19_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 75,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B19_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 76,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B20_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 77,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B20_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 78,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B21_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 79,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B21_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 80,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B22_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 81,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B22_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 82,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B23_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 83,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B23_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 84,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B24_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 85,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B24_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 86,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B25_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 87,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B25_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 88,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B26_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 89,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B26_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 90,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B27_IZQ",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 91,
    "Activo": "Si"
  },
  {
    "Modulo": "M_B27_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 92,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 6_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 93,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 6_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 94,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 7_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 95,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 7_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 96,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 8_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 97,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 8_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 98,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 9_DER",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 100,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 9 IZQ",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 101,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 10_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 102,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 10_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 103,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C1_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 104,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C1_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 105,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C2_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 106,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C2_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 107,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C3 _IZQ",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 108,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C3 _DER",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 109,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C4 _IZQ",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 110,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C4_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 111,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C5_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 112,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C5_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 113,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C6_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 114,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C6_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 115,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C7_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 116,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C7_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 117,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C8_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 118,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C8_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 119,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C9_IZQ",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 120,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C9_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 121,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C10_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 122,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C10_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 123,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C11_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 124,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C11_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 125,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C12_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 126,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C12_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 127,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C13_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 128,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C13_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 129,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C14_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 130,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C14_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 131,
    "Activo": "Si"
  },
  {
    "Modulo": "M_COLUMNA C_2",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 132,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C15_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 134,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C15_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 135,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C16_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 136,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C16_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 137,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C17_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 138,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C17_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 139,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C18_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 140,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C18_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 141,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C19_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 142,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C19_DER_",
    "Bodega": "Ret Pack",
    "Fase": "B",
    "Orden": 143,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C20_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "B",
    "Orden": 144,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C20_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 145,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C21_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 146,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C21_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 147,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C22_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 148,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C22_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 149,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C23_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 150,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C23_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 151,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C24_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 152,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C24_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 153,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C25_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 154,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C25_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 155,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C26_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 156,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C26_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 157,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C27_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 158,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C27_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 159,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C28_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 160,
    "Activo": "Si"
  },
  {
    "Modulo": "M_C28_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 161,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 11_DER",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 162,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 12_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 163,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 12_IZQ",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 164,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 13_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 165,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 13_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 166,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 14_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 167,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 14_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 168,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 15_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 169,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 15_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 170,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 16_DER",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 171,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 16_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 172,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D1_DER",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 173,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D2_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 175,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D2_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 176,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D3_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 177,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D3_DER",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 178,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D4_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 179,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D4_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 180,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D5_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 181,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D5_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 182,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D6_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 183,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D6_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 184,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D7_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 185,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D7_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 186,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D8_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 187,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D8_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 188,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D9_IZQ",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 189,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D9_DER",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 190,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D10_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 191,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D10_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 192,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D11_IZQ",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 193,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D11_DER",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 194,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D12_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 195,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D12_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 196,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D13_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 197,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D13_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 198,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D14_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 199,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D14_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 200,
    "Activo": "Si"
  },
  {
    "Modulo": "M_COLUMNA_D",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 201,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D15_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 202,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D15_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 203,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D16_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 204,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D16_DER",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 205,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D17_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 206,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D17_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 207,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D18_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 208,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D18_DER",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 209,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D19_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 210,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D19_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 211,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D20_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 212,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D20_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 213,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D21_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 214,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D21_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 215,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D22_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 216,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D22_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 217,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D23_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 218,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D23_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 219,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D24_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 220,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D24_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 221,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D25_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 222,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D25_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 223,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D26_IZQ",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 224,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D26_DER",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 225,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D27_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 226,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D27_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 227,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D28_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 228,
    "Activo": "Si"
  },
  {
    "Modulo": "M_D28_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 229,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 17_DER",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 230,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 17_LAT",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 231,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 18_DER",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 232,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 18_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 233,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 19_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 234,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 19_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 235,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 20 DER",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 236,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 20 IZQ",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 238,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 21_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 239,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 21_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 240,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E1_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 241,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E1_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 242,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E2_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 243,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E2_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 244,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E3_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 245,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E3_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 246,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E4_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 247,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E4_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 248,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E5_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 249,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E5_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 250,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E6_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 251,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E6_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 252,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E7_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 253,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E7_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 254,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E8_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 255,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E8_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 256,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E9_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 257,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E9_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 258,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E10_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 259,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E10_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 260,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E11_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 261,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E11_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 262,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E12_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 263,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E12_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 264,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E13_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 265,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E13_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 266,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E14_IZQ_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 267,
    "Activo": "Si"
  },
  {
    "Modulo": "M_E14_DER_",
    "Bodega": "Ret Pack",
    "Fase": "A",
    "Orden": 268,
    "Activo": "Si"
  },
  {
    "Modulo": "LATERAL PET",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 269,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F1_LAT",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 270,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F1_DER_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 271,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F1_IZQ_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 272,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F2_DER_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 273,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F2_IZQ_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 274,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F3_DER_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 275,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F3_IZQ_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 276,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F4_DER",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 277,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F4_IZQ_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 279,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F5_DER_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 280,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F5_IZQ_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 281,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F6_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 282,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F7_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 283,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F8_DER_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 284,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F8_IZQ_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 285,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F8_LAT",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 286,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F9_LAT",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 287,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F9_DER",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 288,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F9_IZQ",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 289,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F10_DER_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 290,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F10_IZQ_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 291,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F11_DER_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 292,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F11_IZQ_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 293,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F12_DER_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 294,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F12_IZQ_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 295,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F13_DER_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 296,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F13_IZQ_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 297,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F14_DER_",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 298,
    "Activo": "Si"
  },
  {
    "Modulo": "E_F15__",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 299,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F17__",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 301,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F18__",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 302,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F19__",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 303,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F20__",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 304,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F21__",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 305,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F22__",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 306,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F23__",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 307,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F24__",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 308,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F25__",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 309,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F26__",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 310,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F27__",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 311,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F28__",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 312,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F29__",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 313,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F30__",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 314,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F30__LAT",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 315,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F31__LAT",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 316,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F31__",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 317,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F32__",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 318,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F33__",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 319,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F34__",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 320,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F35__",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 321,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F36__",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 322,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F37__",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 323,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F38__",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 324,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F39__",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 325,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F40__",
    "Bodega": "One Way",
    "Fase": "A",
    "Orden": 326,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F41__",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 327,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F42__",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 328,
    "Activo": "Si"
  },
  {
    "Modulo": "M_F43__",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 329,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G1_ATRAS",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 330,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G1_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 331,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G1_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 332,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G2_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 333,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G2_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 334,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G3_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 335,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G3_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 336,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G4_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 337,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G4_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 338,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G5_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 339,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G5_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 340,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G6_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 341,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G6_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 342,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G7_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 343,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G7_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 344,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G8_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 345,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G8_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 346,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G9_LAT",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 347,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G9_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 348,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G9_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 349,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G10_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 350,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G10_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 351,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G11_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 352,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G11_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 353,
    "Activo": "Si"
  },
  {
    "Modulo": "M_G12",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 354,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H1_ATRAS_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 355,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H1_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 356,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H1_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 357,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H2_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 358,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H2_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 359,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H3_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 360,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H3_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 361,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H4_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 362,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H4_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 363,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H5_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 364,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H5_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 365,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H6_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 366,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H6_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 367,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H7_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 368,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H7_DER_ATRAS",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 369,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H7_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 370,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H8_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 371,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H8_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 372,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H9_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 373,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H9_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 374,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H10_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 375,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H10_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 376,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H11_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 377,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H11_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 378,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H12_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 379,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H12_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 380,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H13_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 382,
    "Activo": "Si"
  },
  {
    "Modulo": "M_H13_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 383,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I1_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 384,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I2_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 385,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I2_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 386,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I3_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 387,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I3_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 388,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I4_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 389,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I4_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 390,
    "Activo": "Si"
  },
  {
    "Modulo": "E_ENTRE TUNELES",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 391,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I5_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 395,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I6_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 396,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I6_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 397,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I7_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 398,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I7_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 400,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I8_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 401,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I8_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 402,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I9_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 403,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I9_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 404,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I10_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 405,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I10_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 406,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I11_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 407,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I11_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 408,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I12_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 409,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I12_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 410,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I13_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 411,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I13_LAT",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 412,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I14_LAT",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 413,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I14_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 414,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I14_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 415,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I15_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 416,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I15_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 417,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I16_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 418,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I16_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 419,
    "Activo": "Si"
  },
  {
    "Modulo": "M_I17_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 420,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J1_LAT",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 421,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J1_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 422,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J1_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 423,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J2_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 424,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J2_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 425,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J3_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 426,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J3_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 427,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J4_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 428,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J4_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 429,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J5_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 430,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J5_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 431,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J6_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 432,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J6_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 433,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J7_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 434,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J7_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 435,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J8_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 436,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J8_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 437,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J9_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 438,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J9_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 439,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J10_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 440,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J10_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 441,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J11_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 442,
    "Activo": "Si"
  },
  {
    "Modulo": "E_J11_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 443,
    "Activo": "Si"
  },
  {
    "Modulo": "M_J12_LAT",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 444,
    "Activo": "Si"
  },
  {
    "Modulo": "M_J12_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 445,
    "Activo": "Si"
  },
  {
    "Modulo": "M_J13_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 447,
    "Activo": "Si"
  },
  {
    "Modulo": "M_J13_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 448,
    "Activo": "Si"
  },
  {
    "Modulo": "M_J14_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 449,
    "Activo": "Si"
  },
  {
    "Modulo": "M_J14_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 450,
    "Activo": "Si"
  },
  {
    "Modulo": "M_J15_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 451,
    "Activo": "Si"
  },
  {
    "Modulo": "M_J15_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 452,
    "Activo": "Si"
  },
  {
    "Modulo": "M_KPASILLO__",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 453,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K1__DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 492,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K1__IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 493,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K2_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 494,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K2_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 495,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K3_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 496,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K3_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 497,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K4_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 498,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K4_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 499,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K5_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 500,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K5_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 501,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K6_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 502,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K6_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 503,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K7_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 504,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K7_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 505,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K8_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 506,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K8_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 507,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K9_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 508,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K9_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 509,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K10_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 510,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K10_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 511,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K11_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 512,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K11_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 513,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K12_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 514,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K12_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 515,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K13_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 516,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K13_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 517,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K14_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 518,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K14_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 519,
    "Activo": "Si"
  },
  {
    "Modulo": "M_K15_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 520,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L_PASILLO-1",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 521,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L_PASILLO-2",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 523,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L_PASILLO-3",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 524,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L1_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 525,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L1_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 526,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L2_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 528,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L2_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 529,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L3_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 530,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L3_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 531,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L4_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 532,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L4_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 533,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L5_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 534,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L5_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 535,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L6_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 536,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L6_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 537,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L7_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 538,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L7_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 539,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L8_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 540,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L8_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 541,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L9_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 542,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L9_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 543,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L10_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 544,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L10_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 545,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L11_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 546,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L11_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 547,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L12_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 548,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L12_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 550,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L13_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 551,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L13_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 552,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L14_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 553,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L14_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 554,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L15",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 555,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 27- DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 556,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 27- IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 557,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 28_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 558,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 28_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 559,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 29_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 560,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 29_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 561,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 30_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 562,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 30_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 563,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 31_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 564,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 31_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 565,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 32_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 566,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 32_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 567,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 33_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 568,
    "Activo": "Si"
  },
  {
    "Modulo": "BH_BAHIA 33_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 569,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L16",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 570,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L17_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 571,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L18_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 572,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L18_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 573,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L19_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 574,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L19_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 575,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L20_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 576,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L20_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 577,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L21_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 578,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L21_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 579,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L22_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 580,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L22 DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 581,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L23_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 582,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L23_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 583,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L24_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 584,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L24_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 585,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L25_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 586,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L25_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 587,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L26_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 588,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L26_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 589,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L27_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 590,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L27_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 591,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L28_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 592,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L28_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 593,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L29 IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 594,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L29 DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 595,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L30_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 596,
    "Activo": "Si"
  },
  {
    "Modulo": "M_L30_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 597,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O1_LAT",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 598,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O1",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 600,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O2",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 601,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O3",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 602,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O4",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 603,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O5",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 605,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O6",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 606,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O7",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 607,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O8",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 608,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O9_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 609,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O10",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 614,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O11",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 619,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O12",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 621,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O13",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 622,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O14",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 623,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O14_LAT",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 624,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O15",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 625,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O16",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 626,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O17",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 627,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O18",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 628,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O19",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 629,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O20",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 630,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O21",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 631,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O22",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 632,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O23",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 633,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O24",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 634,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O25",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 635,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O26",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 636,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O27",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 637,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O28 _",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 638,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O29_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 639,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O30_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 640,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O31_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 641,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O32_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 642,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O33_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 643,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O34_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 644,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O35_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 645,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O36_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 646,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O37_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 647,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O38_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 648,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O39_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 649,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O40_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 650,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O41_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 651,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O42_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 652,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O43_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 653,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O44_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 654,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O45_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 655,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O46_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 656,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O47_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 657,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O48_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 658,
    "Activo": "Si"
  },
  {
    "Modulo": "E_O49_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 659,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O50_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 660,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O51_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 661,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O51_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 662,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O52_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 663,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O52_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 664,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O53_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 665,
    "Activo": "Si"
  },
  {
    "Modulo": "M_O53_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 666,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N1_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 667,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N1_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 668,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N2_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 669,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N2_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 670,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N3_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 671,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N3_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 672,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N4_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 673,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N4_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 674,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N5_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 675,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N5_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 676,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N6_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 677,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N6_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 678,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N7_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 679,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N7_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 681,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N8_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 682,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N8_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 683,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N9_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 684,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N9_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 685,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N10_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 687,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N10_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 688,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N11_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 689,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N11_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 690,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N12_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 692,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N12_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 693,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N13_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 694,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N13_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 695,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N14_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 697,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N14_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 698,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N15_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 699,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N15_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 700,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N16_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 701,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N16_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 702,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N17_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 703,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N17_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 704,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N18_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 705,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N18_IZQ",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 706,
    "Activo": "Si"
  },
  {
    "Modulo": "M_N20_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 708,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M1_LAT_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 711,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M1_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 712,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M1_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 713,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M2_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 714,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M2_LAT_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 715,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M3_LAT_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 716,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M3_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 717,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M4_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 718,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M4_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 719,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M5_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 720,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M5_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 721,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M6_DER",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 722,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M6 LAT",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 723,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M7_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 724,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M7_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 725,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M8_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 726,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M9_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 727,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M9_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 728,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M10_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 729,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M10_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 730,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M11_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 731,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M12_LAT_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 732,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M12_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 735,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M13_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 736,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M13_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 738,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M14_IZQ_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 739,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M14_DER_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 740,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M15_",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 741,
    "Activo": "Si"
  },
  {
    "Modulo": "M_M15_LAT",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 742,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB1",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 744,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB2",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 745,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB3",
    "Bodega": "One Way",
    "Fase": "B",
    "Orden": 746,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB4",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 747,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB5",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 748,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB6",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 749,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB7",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 750,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB8",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 751,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB9",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 752,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB10",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 753,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB11",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 754,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB12",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 755,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB13",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 756,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB14",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 757,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB15",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 758,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB16",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 759,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB17",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 760,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB18",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 761,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB19",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 762,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB20",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 763,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB21",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 764,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB22",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 765,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB23",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 766,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB24",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 767,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB25",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 768,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB26",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 769,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB27",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 770,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB28",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 771,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB29",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 772,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB30",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 773,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB31",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 774,
    "Activo": "Si"
  },
  {
    "Modulo": "CPB32",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 775,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC1",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 776,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC2",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 777,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC3",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 778,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC4",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 779,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC5",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 780,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC6",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 781,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC7",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 782,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC8",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 783,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC9",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 784,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC10",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 785,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC11",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 786,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC12",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 787,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC13",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 788,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC14",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 789,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC15",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 790,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC16",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 791,
    "Activo": "Si"
  },
  {
    "Modulo": "PCPC01",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 792,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC17",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 793,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC18",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 794,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC19",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 795,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC20",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 796,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC21",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 797,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC22",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 798,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC23",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 799,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC24",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 801,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC25",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 803,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC26",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 804,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC27",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 805,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC28",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 806,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC29",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 807,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC30",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 808,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC31",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 809,
    "Activo": "Si"
  },
  {
    "Modulo": "CPC32",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 810,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD1",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 811,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD2",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 812,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD3",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 813,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD4",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 814,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD5",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 815,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD6",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 816,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD7",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 817,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD8",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 818,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD9",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 819,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD10",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 820,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD11",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 821,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD12",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 822,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD13",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 823,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD14",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 824,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD15",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 825,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD16",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 826,
    "Activo": "Si"
  },
  {
    "Modulo": "PCPD01",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 827,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD17",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 828,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD18",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 829,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD19",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 830,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD20",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 831,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD21",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 832,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD22",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 833,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD23",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 834,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD24",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 835,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD25",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 836,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD26",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 837,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD27",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 838,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD28",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 839,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD29",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 840,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD30",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 841,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD31",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 842,
    "Activo": "Si"
  },
  {
    "Modulo": "CPD32",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 843,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE1",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 844,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE2",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 845,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE3",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 846,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE4",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 847,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE5",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 848,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE6",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 849,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE7",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 850,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE8",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 851,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE9",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 852,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE10",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 853,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE11",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 854,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE12",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 855,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE13",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 857,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE14",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 858,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE15",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 860,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE16",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 861,
    "Activo": "Si"
  },
  {
    "Modulo": "PCPE",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 863,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE17",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 865,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE18",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 866,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE19",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 867,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE20",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 869,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE21",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 870,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE22",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 871,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE23",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 872,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE24",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 873,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE25",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 874,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE26",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 875,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE27",
    "Bodega": "Carpas",
    "Fase": "B",
    "Orden": 876,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE28",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 879,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE29",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 881,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE30",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 882,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE31",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 883,
    "Activo": "Si"
  },
  {
    "Modulo": "CPE32",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 884,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF1",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 886,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF2",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 887,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF3",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 888,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF4",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 889,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF5",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 890,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF6",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 892,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF7",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 893,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF8",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 894,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF9",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 895,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF10",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 896,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF11",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 897,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF12",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 898,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF13",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 899,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF14",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 900,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF15",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 901,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF16",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 902,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF17",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 903,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF18",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 904,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF19",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 905,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF20",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 906,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF22",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 907,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF23",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 908,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF25",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 911,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF26",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 912,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF27",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 913,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF28",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 914,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF29",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 915,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF30",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 916,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF31",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 917,
    "Activo": "Si"
  },
  {
    "Modulo": "CPF32",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 918,
    "Activo": "Si"
  },
  {
    "Modulo": "CPG",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 919,
    "Activo": "Si"
  },
  {
    "Modulo": "CPG29",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 922,
    "Activo": "Si"
  },
  {
    "Modulo": "CPG30",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 923,
    "Activo": "Si"
  },
  {
    "Modulo": "CPG31",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 924,
    "Activo": "Si"
  },
  {
    "Modulo": "CPG32",
    "Bodega": "Carpas",
    "Fase": "C",
    "Orden": 925,
    "Activo": "Si"
  },
  {
    "Modulo": "J_JAULA 1",
    "Bodega": "Carpas",
    "Fase": "A",
    "Orden": 926,
    "Activo": "Si"
  },
  {
    "Modulo": "J_REP__L2",
    "Bodega": "Carpas",
    "Fase": "A",
    "Orden": 927,
    "Activo": "Si"
  },
  {
    "Modulo": "J_JAULA 2",
    "Bodega": "Carpas",
    "Fase": "A",
    "Orden": 928,
    "Activo": "Si"
  },
  {
    "Modulo": "J_JAULA 3",
    "Bodega": "Carpas",
    "Fase": "A",
    "Orden": 929,
    "Activo": "Si"
  },
  {
    "Modulo": "J_JAULA 4",
    "Bodega": "Carpas",
    "Fase": "A",
    "Orden": 930,
    "Activo": "Si"
  },
  {
    "Modulo": "J_JAULA 5",
    "Bodega": "Carpas",
    "Fase": "A",
    "Orden": 931,
    "Activo": "Si"
  },
  {
    "Modulo": "J_JAULA 8",
    "Bodega": "Carpas",
    "Fase": "A",
    "Orden": 932,
    "Activo": "Si"
  },
  {
    "Modulo": "J_JAULA 9",
    "Bodega": "Carpas",
    "Fase": "A",
    "Orden": 933,
    "Activo": "Si"
  }
];

