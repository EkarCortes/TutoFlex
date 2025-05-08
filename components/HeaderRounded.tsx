import type { FC } from 'react';
import React from 'react';
import { View, Text } from 'react-native';

interface RoundedHeaderProps {
  title: string;
  subTitle?: string;
  backgroundColor?: string;
  textColor?: string;

}

const RoundedHeader: FC<RoundedHeaderProps> = ({
  title,
  subTitle,
  backgroundColor = 'bg-[#096491]',
  textColor = 'white',
}) => {
  return (
    <View
      className={`${backgroundColor} w-full overflow-hidden rounded-bl-3xl rounded-br-3xl p-16 shadow-lg`}>
      <Text className={`text-${textColor} font-[Young Serif] text-center text-3xl`}>{title}</Text>
      <Text className={`text-${textColor} font-[Young Serif] m-1 text-center text-base`}>
        {subTitle}
      </Text>
    </View>
  );
};

export default RoundedHeader;
