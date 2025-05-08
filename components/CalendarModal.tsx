import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (day: { dateString: string }) => void;
  selectedDate?: string;
  minDate?: string;
  title: string;
  selectedColor?: string;
}

const CalendarModal = ({
  visible,
  onClose,
  onDateSelect,
  selectedDate,
  minDate,
  title,
  selectedColor = '#FB8500'
}: CalendarModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      presentationStyle="overFullScreen"
      hardwareAccelerated={true}
      statusBarTranslucent={true}
    >
      <View className="flex-1 bg-black/70 justify-center items-center p-5">
        <View className="bg-white w-full rounded-2xl overflow-hidden">
          <View className="bg-[#0d6a97] p-3 flex-row justify-between items-center">
            <Text className="text-white text-lg font-bold">{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <Calendar
            minDate={minDate}
            onDayPress={onDateSelect}
            markedDates={
              selectedDate
                ? {
                    [selectedDate]: {
                      selected: true,
                      selectedColor: selectedColor
                    }
                  }
                : {}
            }
            theme={{
              selectedDayBackgroundColor: selectedColor,
              todayTextColor: '#FB8500',
              arrowColor: '#0d6a97',
              textSectionTitleColor: '#0d6a97',
              monthTextColor: '#0d6a97',
              textDayHeaderFontWeight: 'bold'
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;