import { useState, useEffect } from 'react';

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