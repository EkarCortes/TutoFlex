import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface CustomDropdownProps {
  data: { label: string; value: number }[];
  value: number | null;
  onChange: (value: number) => void;
  placeholder: string;
  searchPlaceholder?: string;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  data,
  value,
  onChange,
  placeholder,
  searchPlaceholder = 'Buscar...',
  iconName = 'arrow-drop-down' as keyof typeof MaterialIcons.glyphMap,
}) => {
  return (
    <View className="my-2 flex-row items-center rounded-md bg-white pl-2">
      <MaterialIcons name={iconName} size={24} color="#023047" />
      <Dropdown
        style={{ flex: 1, marginLeft: 16, height: 48 }}
        placeholderStyle={{ fontSize: 16, color: '#023047' }}
        selectedTextStyle={{ fontSize: 16, color: 'black' }}
        inputSearchStyle={{ 
          height: 40, 
          fontSize: 16,
          borderRadius: 8,
          paddingHorizontal: 8,
          backgroundColor: '#f0f0f0',
        }}
        containerStyle={{
          borderRadius: 8,
          overflow: 'hidden',
          marginTop: 8,
        }}
        data={data}
        search
        searchPlaceholder={searchPlaceholder}
        searchPlaceholderTextColor="#023047"
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={(item) => onChange(item.value)}
      />
    </View>
  );
};

export default CustomDropdown;