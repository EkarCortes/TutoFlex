import { useState } from "react";
import { getBillsProfessor, getDetailsBillProfessor, getTotalNetInvoices, payMultipleDeductions } from "../services/deductionsService";

export const useDeductions = () => {
  const [deductions, setDeductions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBills = async () => {
    setLoading(true);
    try {
      return await getBillsProfessor();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getDetailsBill = async (factura_id) => {
    setLoading(true);
    try {
      return await getDetailsBillProfessor(factura_id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDeduction = (monto) => {
    return (parseFloat(monto) * 0.02).toFixed(2);
  };

  const getTotalNetInvoices = async () => {
    setLoading(true);
    try {
      return await getTotalNetInvoices();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const payDeductions = async (transferNumber, comprobante, deductionIds) => {
    setLoading(true);
    try {
      await payMultipleDeductions(transferNumber, comprobante, deductionIds);
      console.log("Pago realizado correctamente");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    getBills,
    getDetailsBill,
    calculateDeduction,
    getTotalNetInvoices,
    payDeductions,
    deductions,
    setDeductions,
    loading,
  };
};
