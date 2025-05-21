import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import { cancelTutorial } from "../../services/paymentService";

export interface PendingPayment {
  pago_id: number;
  tutoria_id: number;
  profesor_id: number;
  Nombre_Profesor: string;
  estudiante_id: number;
  Nombre_Estudiante: string;
  curso_id: number;
  nombre: string;
  modalidad: string;
  fecha_tutoria: string;
  hora_inicio_tutoria: string;
  hora_fin_tutoria: string;
  monto: string;
  estado: string;
  whatsapp: string;
}

// Este hook se encarga de manejar la lógica de los pagos pendientes del Estudiante.

const usePendingPaymentsStudent = () => {
  const [tutorials, setTutorials] = useState<PendingPayment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPendingPayments = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get("/payments/pendingPaymentsStudent");

      if (response.data && response.data.success) {
        setTutorials(response.data.data);
        console.log("Pagos pendientes obtenidos Ekar:", response.data.data);
      } else {
        setError(response.data?.message || "No se pudieron obtener los pagos pendientes");
      }
    } catch (err) {
      console.error("Error al cargar los pagos pendientes:", err);
      setError("No se pudieron cargar los pagos pendientes.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelTutorial = async (tutoria_id: number) => {
    try {
      setLoading(true);
      await cancelTutorial(tutoria_id);
      fetchPendingPayments();
    } catch (error) {
      console.error("Error al cancelar la tutoría:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  return { tutorials, loading, error, refreshTutorials: fetchPendingPayments, handleCancelTutorial };
};

export default usePendingPaymentsStudent;