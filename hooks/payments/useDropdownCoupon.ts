import { useEffect, useState } from 'react';
import { getCoupons, Coupon } from '../../services/CouponService';

export const usePaymentCoupon = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      try {
        const allCoupons = await getCoupons();
        const now = new Date();
        const filtered = allCoupons.filter(
          (c: Coupon) =>
            new Date(c.fecha_inicio) <= now &&
            new Date(c.fecha_expiracion) >= now
        );
        setCoupons(filtered);
      } catch (e) {
        setCoupons([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  return {
    coupons,
    selectedCoupon,
    setSelectedCoupon,
    loading,
  };
};