import type { FC } from 'react';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useFontsLoader from '../hooks/useFontsLoader';
import { MaterialIcons } from '@expo/vector-icons';

interface RoundedHeaderProps {
  title: string;
  subTitle?: string;
  backgroundColor?: string;
  textColor?: string;
}

const RoundedHeader: FC<RoundedHeaderProps> = ({
  title,
  backgroundColor = 'bg-[#096491]',
  textColor = 'white',

}) => {

  const navigation = useNavigation();
  useFontsLoader();
  return (
    <View className={`${backgroundColor} w-full overflow-hidden rounded-bl-3xl rounded-br-3xl p-5 text-center mb-1 shadow-lg`}>
      <Text className={`text-${textColor} font-[Young Serif] text-center text-3xl`} style={{ fontFamily: "SpaceGrotesk-Bold" }}>{title}</Text>
    </View>
  );
};

export default RoundedHeader;
