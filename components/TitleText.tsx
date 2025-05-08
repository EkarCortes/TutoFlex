

import React from 'react';
import { Text, View } from 'react-native';
import useFontsLoader from '../hooks/useFontsLoader';


interface titleProps {
    textTitle: string;
}

const Title = ({ textTitle }: titleProps) => {
  useFontsLoader();
  return (
    <View>
    <Text className="text-white ml-5 mt-8 text-2xl" style={{ fontFamily: 'SpaceGrotesk-Bold' }}>{ textTitle }</Text>
    </View>
  );
};



export default Title;

