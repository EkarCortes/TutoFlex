import axiosInstance from "../api/axiosConfig";

export interface DeductionPaidItem {
  deducciones_ids: string[];
  numero_tranferencia: string;
  comprobante: string | null;
}
export const getAllDeductionsPaid = async (): Promise<DeductionPaidItem[]> => {
  try {
    const response = await axiosInstance.get("deductions/getAllDeductionsByProfessor");
    if (response.data.success && Array.isArray(response.data.data)) {
      return response.data.data.map((item: any) => ({
        deduccion_id: item.deduccion_id,
        numero_tranferencia: item.numero_tranferencia,
        comprobante: item.comprobante,
      }));
    } else {
      throw new Error(response.data.message || "No se pudieron obtener las deducciones pagadas.");
    }
  } catch (error) {
    console.error("Error al obtener deducciones pagadas:", error);
    throw error;
  }
};
export const getBillsProfessor = async (): Promise<any[]> => {
  try {
    const response = await axiosInstance.get("/deductions/getBillsProfessor");
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Error al obtener las facturas");
    }
  } catch (error) {
    console.error("Error al obtener facturas:", error);
    throw error;
  }
};

export const getDetailsBillProfessor = async (factura_id: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/deductions/getDetailsBillProfessor?factura_id=${factura_id}`);
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Error al obtener detalles de la factura");
    }
  } catch (error) {
    console.error("Error al obtener detalles de la factura:", error);
    throw error;
  }
};

export const calculateDeduction = (monto: string): string => {
  return (parseFloat(monto) * 0.02).toFixed(2); // 2% de deducción
};


export const getTotalNetInvoices = async (): Promise<number> => {
  try {
    const response = await axiosInstance.get("/deductions/getTotalNetInvoicesTeacher");
    if (response.data.success) {
      return response.data.data.total_neto;
    } else {
      throw new Error(response.data.message || "Error al obtener el total neto");
    }
  } catch (error) {
    console.error("Error al obtener el total neto de las facturas:", error);
    throw error;
  }
};


export const payMultipleDeductions = async (
  data: DeductionPaidItem | FormData
): Promise<any> => {
  try {
    let res;
    if (data instanceof FormData) {
      res = await axiosInstance.post("/deductions/payMultipleDeductions", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      res = await axiosInstance.post("/deductions/payMultipleDeductions", data);
    }

    console.log("payMultipleDeductions:", res.status, res.data);
    return res.data;
  } catch (error: any) {
    console.error("Error payMultipleDeductions:", error.response?.data || error.message);
    throw error;
  }
};

export const getDeductionProfessor = async () => {
  try {
    const response = await axiosInstance.get("/deductions/getDeductionProfessor");
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Error al obtener deducciones.");
    }
  } catch (error) {
    console.error("Error al obtener deducciones:", error);
    throw error;
  }
};
