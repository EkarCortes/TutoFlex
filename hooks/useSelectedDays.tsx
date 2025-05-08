import { useState, useCallback } from "react";

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