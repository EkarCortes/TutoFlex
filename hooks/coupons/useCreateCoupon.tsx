import { useState } from "react";
import { createCoupon, CreateCouponData } from "../../services/CouponService";

const useCreateCoupon = (onCouponCreated?: () => Promise<void>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addCoupon = async (data: CreateCouponData) => {
    try {
      setLoading(true);
      await createCoupon(data);
      setError(null);
      if (onCouponCreated) {
        await onCouponCreated();
      }
      return true;
    } catch (err) {
      console.error("Error al crear el cupón:", err);
      setError("No se pudo crear el cupón");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addCoupon, loading, error };
};

export default useCreateCoupon;