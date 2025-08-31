import { useCallback, useEffect, useState } from "react";
import { fetchPendingTutorials, Tutorial } from "../services/tutorialsService";

//Est hook se encarga de obtener los tutoriales pendientes y formatear la información
// para que sea más fácil de usar en los componentes.

function formatFecha(fechaISO: string): string {
  const date = new Date(fechaISO);
  // Formato: dd/mm/yyyy
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatMonto(monto: string): string {
  // Convierte a número y quita decimales
  return parseInt(monto, 10).toString();
}

function formatHorario(inicio: string, fin: string): string {
  // Devuelve el formato "hh:mm:ss - hh:mm:ss"
  return `${inicio} - ${fin}`;
}

export function usePendingTutorials() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadTutorials = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPendingTutorials();
      // Parsear la fecha, monto y horario antes de setear los datos
      const parsed = data.map(t => ({
        ...t,
        fecha_tutoria: formatFecha(t.fecha_tutoria),
        monto: formatMonto(t.monto),
        horario: formatHorario(t.hora_inicio, t.hora_fin),
      }));
      setTutorials(parsed);
      
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTutorials();
  }, [loadTutorials]);

  return {
    tutorials,
    loading,
    error,
    refreshTutorials: loadTutorials,
  };
}