

import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get("window");

const ImageCarousel = () => {
  const images = [
    { key: '1', image: require('../assets/images/people-1.jpeg') },
    { key: '2', image: require('../assets/images/people-2.jpeg') },
    { key: '3', image: require('../assets/images/people-3.jpeg') },
  ];

  return (
    <View className="flex-1 items-center mt-5">
      <Carousel
        width={300}
        height={250}
        autoPlay={true}
        autoPlayInterval={3000}
        data={images}
        renderItem={({ item }) => (
          <View className="flex-1 justify-center items-center bg-gray-300 rounded-xl mt-6 mx-2">
            <Image source={item.image} className="w-full h-full rounded-xl" />
          </View>
        )}
      />
    </View>
  );
};

export default ImageCarousel;