import React from 'react';
import { View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useCalendarLogic } from '../hooks/tutorial/useCalendarLogic';


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
  const { today, markedDates, handleDayPress } = useCalendarLogic(
    selectedDates,
    onDayPress,
    disabledDaysOfWeek
  );

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