import { useEffect, useState } from "react";
import { DeductionPaidItem, getAllDeductionsPaid } from "../services/deductionsService";

const useAllDeductionsPaid = () => {
  const [deductionsPaid, setDeductionsPaid] = useState<DeductionPaidItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeductionsPaid = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllDeductionsPaid();
      setDeductionsPaid(data);
    } catch (err) {
      setError("Error al obtener las deducciones pagadas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeductionsPaid();
  }, []);

  return { deductionsPaid, loading, error, refresh: fetchDeductionsPaid };
};

export default useAllDeductionsPaid;
