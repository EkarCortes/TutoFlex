import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import usePaymentCoupon from '@/hooks/payments/usePaymentCoupon';
import { Coupon, getCoupons } from '../../services/CouponService';
import usePaymentHandler from '@/hooks/payments/usePaymentHandler';
import axiosInstance from "@/api/axiosConfig";

// Este hook se encarga de manejar la lógica de confirmación de pago en pagos pendientes del Estudiante.

const useConfirmPayment = () => {
    const router = useRouter();
    const { tutorial } = useLocalSearchParams();
    const tutorialData = JSON.parse(tutorial as string);
    const [paymentMethod, setPaymentMethod] = useState<"efectivo" | "transferencia">("efectivo");
    const [comprobanteUri, setComprobanteUri] = useState<string | null>(null);
    const [transferNumber, setTransferNumber] = useState<string>("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [userPoints, setUserPoints] = useState(0);

    const { discountedAmount, selectedCoupon, applyCoupon } = usePaymentCoupon(
        parseFloat(tutorialData.monto_total)
    );

    const { handleValidatePayment, handleConfirmPayment, loading } = usePaymentHandler({
        tutorialData,
        discountedAmount,
        paymentMethod,
        transferNumber,
        comprobanteUri,
        selectedCoupon,
        router,
    });

    useEffect(() => {
        const fetchCouponsAndPoints = async () => {
            try {
                const couponsData = await getCoupons();
                setCoupons(couponsData);

                const pointsResponse = await axiosInstance.get("/points/getPoints");
                setUserPoints(pointsResponse.data.data[0][0]?.cantidad_puntos || 0);
            } catch (error) {
                console.error("Error al obtener cupones o puntos:", error);
            }
        };

        fetchCouponsAndPoints();
    }, []);

    return {
        tutorialData,
        paymentMethod,
        setPaymentMethod,
        comprobanteUri,
        setComprobanteUri,
        transferNumber,
        setTransferNumber,
        showConfirmModal,
        setShowConfirmModal,
        coupons,
        userPoints,
        discountedAmount,
        selectedCoupon,
        applyCoupon,
        handleValidatePayment,
        handleConfirmPayment,
        loading,
    };
};

export default useConfirmPayment;