import { useState, useEffect } from 'react';

// Este hook se utiliza para gestionar el estado de la modalidad
// en la pantalla de Detalles de tutoriales. Permite seleccionar la modalidad
// y establecer un valor por defecto basado en los datos del tutor.

export const useModalityState = (tutorData: any) => {
  const [selectedModalidad, setSelectedModalidad] = useState<string | null>(null);
  
  // Initialize the selected modality based on the tutor data
  useEffect(() => {
    if (!tutorData?.modalidad) {
      setSelectedModalidad("Presencial"); // Default
      return;
    }
    
    const modalidad = tutorData.modalidad.toLowerCase();
    
    // For hybrid, set Presencial as default
    if (modalidad === "hibrida" || modalidad === "híbrida") {
      setSelectedModalidad("Presencial");
    } else {
      // For non-hybrid, use the tutor's modality (with first letter capitalized)
      setSelectedModalidad(
        tutorData.modalidad.charAt(0).toUpperCase() + 
        tutorData.modalidad.slice(1)
      );
    }
  }, [tutorData?.modalidad]);
  
  return { 
    selectedModalidad: selectedModalidad || "Presencial", // Ensure it's never null
    setSelectedModalidad 
  };
};