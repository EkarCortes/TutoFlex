import useGetCoupons from "./useGetCoupons";
import useCreateCoupon from "./useCreateCoupon";
import useDeleteCoupon from "./useDeleteCoupon";

const useCoupons = () => {
  const { coupons, loading: loadingGet, error: errorGet, refreshCoupons } = useGetCoupons();
  const { addCoupon, loading: loadingCreate, error: errorCreate } = useCreateCoupon(refreshCoupons);
  const { removeCoupon, loading: loadingDelete, error: errorDelete } = useDeleteCoupon(refreshCoupons);

  const loading = loadingGet || loadingCreate || loadingDelete;
  const error = errorGet || errorCreate || errorDelete;

  return {
    coupons,
    loading,
    error,
    addCoupon,
    deleteCoupon: removeCoupon,
    refreshCoupons
  };
};

export default useCoupons;