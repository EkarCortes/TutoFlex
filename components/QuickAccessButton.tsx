import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface QuickAccessButtonProps {
  iconName: string;
  label1: string;
  label2: string;
  onPress?: () => void; // Prop para manejar la navegación
}

const QuickAccessButton: React.FC<QuickAccessButtonProps> = ({ iconName, label1, label2, onPress }) => {
  return (
    <TouchableOpacity 
      className={`bg-[#086491] rounded-xl p-5 ml-5 items-center w-32 h-32 justify-center`}
      onPress={onPress} 
    >
      <MaterialIcons name={iconName as any} size={30} color="#FEB702" className={`mb-2`} />
      <Text className={` text-white text-center text-lg `} style={{ fontFamily: "SpaceGrotesk-Bold" }}>{label1}</Text>
      <Text className={` text-white text-center text-base `} style={{ fontFamily: 'SpaceGrotesk-Bold' }}>{label2}</Text>
    </TouchableOpacity>
  );
};

export default QuickAccessButton;