import { useState } from "react";
import { showToast } from "../../components/Toast";
import useCreateCoupon from "./useCreateCoupon";

export const useCouponForm = () => {
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descuento, setDescuento] = useState("");
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaExpiracion, setFechaExpiracion] = useState<string>("");
  const [puntosRequeridos, setPuntosRequeridos] = useState("");
  
  // Estados para modales
  const [startDateModalVisible, setStartDateModalVisible] = useState(false);
  const [endDateModalVisible, setEndDateModalVisible] = useState(false);

  // Hook de creación de cupón
  const { addCoupon, loading, error } = useCreateCoupon();

  // Función para validar y formatear entrada de porcentaje
  const validatePercentageInput = (text: string) => {
    // Remover caracteres no numéricos excepto punto decimal
    const cleanText = text.replace(/[^0-9.]/g, '');
    
    // Asegurar que solo haya un punto decimal
    const parts = cleanText.split('.');
    const formattedText = parts.length > 1 
      ? `${parts[0]}.${parts.slice(1).join('')}`
      : cleanText;
      
    // Convertir a número para validar el rango
    const numValue = parseFloat(formattedText);
    
    // Si está vacío o es un número válido entre 0 y 100
    if (formattedText === '' || (
      !isNaN(numValue) && 
      numValue >= 0 && 
      numValue <= 100)
    ) {
      setDescuento(formattedText);
    }
  };

  // Validación y manejo de fechas
  const handleFechaInicioChange = (day: { dateString: string }) => {
    const nuevaFechaInicio = day.dateString;
    
    // Validación con fecha de expiración
    if (fechaExpiracion && nuevaFechaInicio > fechaExpiracion) {
      showToast(
        "error", 
        "La fecha de inicio no puede ser posterior a la fecha de expiración",
        "Error",
        "top"
      );
      return;
    }
    
    setFechaInicio(nuevaFechaInicio);
    setStartDateModalVisible(false);
  };

  const handleFechaExpiracionChange = (day: { dateString: string }) => {
    const nuevaFechaExpiracion = day.dateString;
    
    // Validación con fecha de inicio
    if (fechaInicio && nuevaFechaExpiracion < fechaInicio) {
      showToast(
        "error", 
        "La fecha de expiración no puede ser anterior a la fecha de inicio",
        "Error",
        "top"
      );
      return;
    }
    
    setFechaExpiracion(nuevaFechaExpiracion);
    setEndDateModalVisible(false);
  };

  // Manejo del guardado del cupón
  const handleSaveCoupon = async () => {
    // Validación de campos obligatorios
    if (!nombre || !codigo || !descuento || !fechaInicio || !fechaExpiracion || !puntosRequeridos) {
      showToast("error", "Por favor completa todos los campos");
      return;
    }

    // Validación de datos numéricos
    const descuentoNumero = parseFloat(descuento);
    const puntosNumero = parseInt(puntosRequeridos, 10);

    if (isNaN(descuentoNumero) || isNaN(puntosNumero)) {
      showToast("error", "Descuento y Puntos deben ser números válidos");
      return;
    }
    
    // Validación de rango para el descuento
    if (descuentoNumero < 0 || descuentoNumero > 100) {
      showToast("error", "El porcentaje de descuento debe estar entre 0 y 100");
      return;
    }
    
    // Validación final de fechas
    if (fechaInicio > fechaExpiracion) {
      showToast(
        "error", 
        "La fecha de inicio no puede ser posterior a la fecha de expiración",
        "Error",
        "top"
      );
      return;
    }

    // Crear objeto de cupón
    const newCoupon = {
      nombre_cupon: nombre,
      descuento: descuentoNumero,
      fecha_inicio: fechaInicio,
      fecha_expiracion: fechaExpiracion,
      puntos_requeridos: puntosNumero,
      codigo: codigo
    };

    try {
      // Guardar el cupón
      const success = await addCoupon(newCoupon);
      if (success) {
        showToast("success", "Cupón agregado correctamente.", "Éxito", "top");
        resetForm();
      }
    } catch (error) {
      showToast("error", "No se pudo añadir el cupón.", "Error", "top");
      console.error("Error al añadir el cupón:", error);
    }
  };

  // Resetear el formulario
  const resetForm = () => {
    setNombre("");
    setCodigo("");
    setDescuento("");
    setFechaInicio("");
    setFechaExpiracion("");
    setPuntosRequeridos("");
  };

  // Función auxiliar para formateo de fechas
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';

    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return {
    // Estados
    nombre,
    codigo,
    descuento,
    fechaInicio,
    fechaExpiracion,
    puntosRequeridos,
    startDateModalVisible,
    endDateModalVisible,
    loading,
    error,
    
    // Setters
    setNombre,
    setCodigo,
    setDescuento: validatePercentageInput, // Reemplazamos el setter con la función de validación
    setPuntosRequeridos,
    setStartDateModalVisible,
    setEndDateModalVisible,
    
    // Handlers
    handleFechaInicioChange,
    handleFechaExpiracionChange,
    handleSaveCoupon,
    formatDisplayDate
  };
};

export default useCouponForm;