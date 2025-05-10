import { useState, useCallback } from "react";

// Este hook se utiliza para gestionar los días seleccionados en _setClassDetails
export const useSelectedDays = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDay = useCallback((day: string) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  }, []);

  return { selectedDays, toggleDay, setSelectedDays };
};