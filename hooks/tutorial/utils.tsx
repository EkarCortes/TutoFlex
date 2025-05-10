// Constantes compartidas entre los tutoriales
export const DAY_MAPPING_TO_NUMBER: { [key: string]: number } = {
  'Domingo': 0, 'Lunes': 1, 'Martes': 2, 'Miércoles': 3, 
  'Jueves': 4, 'Viernes': 5, 'Sábado': 6
};

export const DAY_MAPPING_TO_NAME: { [key: number]: string } = {
  0: 'Domingo', 1: 'Lunes', 2: 'Martes', 3: 'Miércoles',
  4: 'Jueves', 5: 'Viernes', 6: 'Sábado'
};

// Función de normalización de días
export const normalizeDayName = (day: string): string => {
  if (!day) return '';
  
  const normalized = day
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
  
  if (normalized.includes("lun") || normalized === "l") return 'Lunes';
  if (normalized.includes("mar") || normalized === "m") return 'Martes';
  if (normalized.includes("mie") || normalized.includes("mié") || normalized === "x") return 'Miércoles';
  if (normalized.includes("jue") || normalized === "j") return 'Jueves';
  if (normalized.includes("vie") || normalized === "v") return 'Viernes';
  if (normalized.includes("sab") || normalized.includes("sáb") || normalized === "s") return 'Sábado';
  if (normalized.includes("dom") || normalized === "d") return 'Domingo';
  
  return day;
};