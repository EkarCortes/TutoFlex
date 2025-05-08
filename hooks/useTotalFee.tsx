import { useState, useEffect } from "react";
import { getDeductionProfessor } from "../services/deductionsService";

const useTotalFee = () => {
  const [feeTotal, setFeeTotal] = useState<number>(0);
  const [deductions, setDeductions] = useState<any[]>([]); // Aquí usamos "any[]" ya que no estamos especificando los tipos en el servicio.
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeeTotal = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getDeductionProfessor();

      if (Array.isArray(data)) {
        setDeductions(data);

        const total = data.reduce((acc, item) => {
          return acc + parseFloat(item.monto_deduccion);
        }, 0);

        setFeeTotal(total);
      } else {
        throw new Error("Datos no válidos recibidos de la API.");
      }
    } catch (err) {
      setError("Error al obtener deducciones.");
      console.error("Error al obtener deducciones:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeTotal();
  }, []);

  return { feeTotal, deductions, loading, error };
};

export default useTotalFee;
