import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface QuickAccessButtonProps {
  iconName: string;
  label1: string;
  label2: string;
  onPress?: () => void;
}

const QuickAccessButton: React.FC<QuickAccessButtonProps> = ({
  iconName,
  label1,
  label2,
  onPress,
}) => {
  return (
    <TouchableOpacity
      className="bg-[#0B4D6D] rounded-2xl shadow-lg p-4 mx-2 my-2 items-center w-32 h-34 justify-between  active:scale-95"
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label1} ${label2}`}
    >
      <View className="rounded-full p-3 ">
        <MaterialIcons name={iconName as any} size={32} color="#FEB702" />
      </View>
      <Text
        className="text-white text-center text-base font-bold"
        style={{ fontFamily: 'SpaceGrotesk-Bold' }}
      >
        {label1}
      </Text>
      <Text
        className="text-white text-center text-xs font-semibold"
        style={{ fontFamily: 'SpaceGrotesk-bold' }}
      >
        {label2}
      </Text>
    </TouchableOpacity>
  );
};

export default QuickAccessButton;