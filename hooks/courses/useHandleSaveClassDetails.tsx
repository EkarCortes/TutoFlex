import  { showToast } from "../../components/Toast"; // Importar la función showToast

// Este hook se utiliza para gestionar la lógica de guardar los detalles de una clase
// en _setClassDetails.tsx.

interface UseHandleSaveClassDetailsProps {
  id: string;
  price: string;
  selectedModalidad: string;
  scheduleData: string[];
  addTutoring: (
    id: string,
    price: string,
    scheduleData: string[],
    modalidad: string
  ) => void;
}

export const useHandleSaveClassDetails = ({
  id,
  price,
  selectedModalidad,
  scheduleData,
  addTutoring,
}: UseHandleSaveClassDetailsProps) => {
  const handleSave = () => {
    if (!price.trim()) {
      showToast("error", "Por favor ingrese un precio para la tutoría", "Error", "top");
      return;
    }

    if (!selectedModalidad) {
      showToast("error", "Por favor seleccione una modalidad", "Error", "top");
      return;
    }

    if (scheduleData.length === 0) {
      showToast("error", "Debe agendar al menos un horario de tutoría", "Error", "top");
      return;
    }

    // Llamar a la función para guardar los datos
    addTutoring(id, price, scheduleData, selectedModalidad);
  };

  return handleSave;
};