import { useState } from "react";
import { deleteCoupon } from "../../services/CouponService";

const useDeleteCoupon = (onCouponDeleted?: () => Promise<void>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const removeCoupon = async (id: number) => {
    try {
      setLoading(true);
      await deleteCoupon(id);
      setError(null);
      if (onCouponDeleted) {
        await onCouponDeleted();
      }
      return true;
    } catch (err) {
      console.error("Error al eliminar el cupón:", err);
      setError("No se pudo eliminar el cupón");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { removeCoupon, loading, error };
};

export default useDeleteCoupon;