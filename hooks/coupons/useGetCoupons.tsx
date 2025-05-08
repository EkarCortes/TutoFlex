import { useState, useEffect, useCallback } from "react";
import { getCoupons, Coupon } from "../../services/CouponService";

const useGetCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Obteniendo cupones...");
      const couponsList = await getCoupons();
      console.log("Cupones obtenidos:", couponsList);
      const reversedCoupons = couponsList.reverse();
      setCoupons(reversedCoupons);
      setError(null);
    } catch (err) {
      console.error("Error al obtener los cupones:", err);
      setError("No se pudieron obtener los cupones");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  return { coupons, loading, error, refreshCoupons: fetchCoupons };
};

export default useGetCoupons;