import { useState } from "react";
import { Coupon } from "../services/CouponService";
import Toast from "react-native-toast-message";

interface UsePaymentCouponResult {
  discountedAmount: number;
  selectedCoupon: Coupon | null;
  applyCoupon: (couponCode: string, coupons: Coupon[], userPoints: number) => void;
}

const usePaymentCoupon = (originalAmount: number): UsePaymentCouponResult => {
  const [discountedAmount, setDiscountedAmount] = useState<number>(originalAmount);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const applyCoupon = (couponCode: string, coupons: Coupon[], userPoints: number) => {
    const coupon = coupons.find((c) => c.codigo === couponCode);

    if (!coupon) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Cupón no válido.",
        position: "top",
      });
      return;
    }

    const currentDate = new Date();
    const startDate = new Date(coupon.fecha_inicio);
    const endDate = new Date(coupon.fecha_expiracion);

    if (currentDate < startDate || currentDate > endDate) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "El cupón no está vigente.",
        position: "top",
      });
      return;
    }

    if (userPoints < coupon.puntos_requeridos) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No tienes suficientes puntos para usar este cupón.",
        position: "top",
      });
      return;
    }

    const discount = parseFloat(coupon.descuento.toString());
    const newAmount = originalAmount * (1 - discount / 100);
    setDiscountedAmount(newAmount);
    setSelectedCoupon(coupon);

    Toast.show({
      type: "success",
      text1: "Éxito",
      text2: "Cupón aplicado correctamente.",
      position: "top",
    });
  };

  return { discountedAmount, selectedCoupon, applyCoupon };
};

export default usePaymentCoupon;