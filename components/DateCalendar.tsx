import React, { useMemo, useCallback } from 'react';
import { View, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// Configuración del idioma español
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthNamesShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ],
  dayNames: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

interface DayObject {
  dateString: string;
  onDayPress: (day: DayObject) => void;
  month: number;
  year: number;
  timestamp: number;
}

interface DateCalendarProps {
  selectedDates: { [key: string]: boolean };
  onDayPress: (day: DayObject) => void;
  disabledDaysOfWeek?: number[];
}

const DateCalendar: React.FC<DateCalendarProps> = React.memo(({
  selectedDates,
  onDayPress,
  disabledDaysOfWeek = [],
}) => {
  const today = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }, []);

  const markedDates = useMemo(() => {
    // Procesamos los días marcados
    const result: any = { };
    
    // Agregar marcador para hoy si no está seleccionado
    result[today] = { marked: true, dotColor: '#FA8401' };
    
    // Agregar días seleccionados
    Object.keys(selectedDates).forEach(dateKey => {
      result[dateKey] = {
        ...result[dateKey],
        selected: true,
        selectedColor: '#FA8401',
      };
    });
    
    // Procesar días deshabilitados (solo una vez por mes)
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

  return (
    <View className="mb-6">
      <View className="bg-white rounded-lg overflow-hidden">
        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDates}
          disableAllTouchEventsForDisabledDays={true}
          minDate={today}
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#2C81AD',
            selectedDayBackgroundColor: '#FA8401',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#FA8401',
            dayTextColor: '#023046',
            textDisabledColor: '#d9e1e8',
            dotColor: '#FA8401',
            selectedDotColor: '#ffffff',
            arrowColor: '#2C81AD',
            monthTextColor: '#023046',
            indicatorColor: '#2C81AD',
            'stylesheet.calendar.header': {
              dayTextAtIndex0: { color: '#023046' },
              dayTextAtIndex1: { color: '#023046' },
              dayTextAtIndex2: { color: '#023046' },
              dayTextAtIndex3: { color: '#023046' },
              dayTextAtIndex4: { color: '#023046' },
              dayTextAtIndex5: { color: '#023046' },
              dayTextAtIndex6: { color: '#023046' }
            }
          }}
          locale="es"
        />
      </View>
    </View>
  );
});

export default DateCalendar;