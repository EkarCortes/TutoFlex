import useFontsLoader from '../hooks/useFontsLoader';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: object;
};

const ButtonBotton: React.FC<ButtonProps> = ({ title, onPress, style }) => {
  useFontsLoader();
  return (
    <TouchableOpacity className="bg-[#FB8500] p-4 rounded-lg flex items-center justify-center m-5"
      onPress={onPress} style={style}>
      <Text className='text-white text-lg' style={{ fontFamily: "SpaceGrotesk-Bold" }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonBotton;