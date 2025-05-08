import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View, TextInput } from 'react-native';

interface InputProps {
  icon: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const InputField: React.FC<InputProps> = ({ icon, value, onChangeText, placeholder, secureTextEntry = false, keyboardType = 'default' }) => {
  return (
    <View className="my-2 flex-row items-center rounded-md bg-white pl-2">
      <MaterialIcons name={icon as keyof typeof MaterialIcons.glyphMap} size={24} color="#023047" className="mr-2" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#023047"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        className="flex-1 ml-2 text-lg"
      />
    </View>
  );
};

export default InputField;