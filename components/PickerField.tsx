import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';

interface PickerFieldProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  selectedValue: string | number;
  onValueChange: (itemValue: string | number, itemIndex: number) => void;
  items: { label: string; value: string | number }[];
}

const PickerField: React.FC<PickerFieldProps> = ({ icon, selectedValue, onValueChange, items }) => {
  return (
    <View className="my-2 flex-row items-center rounded-md bg-gray-300 pl-2 p-1">
      <MaterialIcons name={icon} size={24} color="#023047" className="mr-2" />
      <View className="flex-1">
        <View className="rounded-lg border border-gray-300 bg-gray-300">
          <Picker className='bg-gray-300' selectedValue={selectedValue} onValueChange={onValueChange}>
            {items.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default PickerField;