import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface CustomDropdownProps {
  data: { label: string; value: number | string }[];
  value: number | string | null;
  onChange: (value: number | string) => void;
  placeholder: string;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  data,
  value,
  onChange,
  placeholder,
  iconName,
}) => {
  return (
    <View
      className={`my-2 flex-row items-center rounded-md bg-white${iconName ? ' pl-2' : ''}`}
    >
      {iconName && (
        <MaterialIcons name={iconName} size={24} color="#023047" />
      )}
      <Dropdown
        style={{
          flex: 1,
          marginLeft: iconName ? 16 : 7,
          height: 48,
        }}
        placeholderStyle={{ fontSize: 16, color: '#023047' }}
        selectedTextStyle={{ fontSize: 16, color: 'black' }}
        containerStyle={{
          borderRadius: 8,
          overflow: 'hidden',
          marginTop: 8,
          maxHeight: 48 * 3 + 8, 
        }}
        data={data}
        maxHeight={48 * 3 + 8}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={item => onChange(item.value)}
      />
    </View>
  );
};

export default CustomDropdown;