import { useEffect, useState } from "react";
import { getPaymentsDetailsService, Payment } from "../../services/getPaymentsDetailsService";

// Este hook se encarga de manejar la lógica de los detalles del pago.

export const usePaymentDetails = (pagoId: number | null) => {
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            if (pagoId === null) return;

            try {
                const allPayments = await getPaymentsDetailsService();
                const foundPayment = allPayments.find(p => p.pago_id === pagoId) || null;
                setSelectedPayment(foundPayment);
            } catch (error) {
                console.error("Error al cargar detalles del pago:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentDetails();
    }, [pagoId]);

    return {
        selectedPayment,
        loading
    };
};
