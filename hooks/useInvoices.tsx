import { useEffect, useState } from "react";
import { getBillsProfessor } from "../services/deductionsService";

const useInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchInvoices = async () => {
    try {
      const data = await getBillsProfessor();
      setInvoices(data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return { invoices, loading };
};

export default useInvoices;
