import { useMemo, useCallback } from 'react';

// Este hook se utiliza para manejar la lógica del calendario, incluyendo la selección de fechas y la desactivación de días específicos.

interface DayObject {
  dateString: string;
  onDayPress: (day: DayObject) => void;
  month: number;
  year: number;
  timestamp: number;
}

export function useCalendarLogic(
  selectedDates: { [key: string]: boolean },
  onDayPress: (day: DayObject) => void,
  disabledDaysOfWeek: number[] = []
) {
  const today = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }, []);

  const markedDates = useMemo(() => {
    const result: any = {};
    result[today] = { marked: true, dotColor: '#FA8401' };
    Object.keys(selectedDates).forEach(dateKey => {
      result[dateKey] = {
        ...result[dateKey],
        selected: true,
        selectedColor: '#FA8401',
      };
    });
    const todayDate = new Date(today);
    const endDate = new Date(todayDate);
    endDate.setMonth(todayDate.getMonth() + 2);
    const isDayDisabled = (date: string): boolean => {
      const [year, month, day] = date.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day);
      return disabledDaysOfWeek.includes(dateObj.getDay()) || date < today;
    };
    let currentDate = new Date(todayDate);
    while (currentDate <= endDate) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
      if (isDayDisabled(dateString)) {
        result[dateString] = {
          ...result[dateString],
          disabled: true,
          disableTouchEvent: true,
          textColor: '#d9e1e8',
        };
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return result;
  }, [selectedDates, disabledDaysOfWeek, today]);

  const handleDayPress = useCallback((day: DayObject) => {
    const [year, month, dayNum] = day.dateString.split('-').map(Number);
    const dateObj = new Date(year, month - 1, dayNum);
    if (!disabledDaysOfWeek.includes(dateObj.getDay()) && day.dateString >= today) {
      onDayPress(day);
    }
  }, [disabledDaysOfWeek, onDayPress, today]);

  return { today, markedDates, handleDayPress };
}