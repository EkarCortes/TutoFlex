import { useState, useEffect, useCallback } from "react";
import { showToast } from "../../components/Toast";
import  useGetCoupons  from "./useGetCoupons";
import  useDeleteCoupon  from "./useDeleteCoupon";

export const useCouponList = () => {
  const { coupons, loading: loadingCoupons, error, refreshCoupons } = useGetCoupons();
  const { removeCoupon, loading: loadingDelete } = useDeleteCoupon(refreshCoupons);
  
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<{id: number, name: string} | null>(null);

  // Cargar cupones inicialmente
  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = useCallback(async () => {
    await refreshCoupons();
  }, [refreshCoupons]);

  // Manejar la eliminación de cupones
  const handleDelete = (id: number, couponName: string) => {
    setCouponToDelete({ id, name: couponName });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (couponToDelete) {
      setIsDeleting(couponToDelete.id);
      const success = await removeCoupon(couponToDelete.id);
      setIsDeleting(null);
      setShowDeleteModal(false);
      setCouponToDelete(null);
      
      if (success) {
        showToast("success", "Cupón eliminado correctamente.", "Éxito", "top");
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCouponToDelete(null);
  };

  // Utilidades para renderizar cupones
  const formatDate = (dateString: string) => {
    const parts = dateString.split('T')[0].split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; 
    const day = parseInt(parts[2]);
    
    const date = new Date(year, month, day);
    
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getCouponStatus = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) {
      return { status: 'pending', color: '#3182CE', text: 'Próximamente' };
    } else if (now > end) {
      return { status: 'expired', color: '#E53E3E', text: 'Expirado' };
    } else {
      const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      if (daysLeft <= 3) {
        return { status: 'expiring-soon', color: '#DD6B20', text: `Expira en ${daysLeft} día${daysLeft > 1 ? 's' : ''}` };
      }
      return { status: 'active', color: '#38A169', text: 'Activo' };
    }
  };

  return {
    coupons,
    loading: loadingCoupons || loadingDelete,
    error,
    isDeleting,
    showDeleteModal,
    couponToDelete,
    loadCoupons,
    handleDelete,
    confirmDelete,
    cancelDelete,
    formatDate,
    getCouponStatus
  };
};