import React from "react";
import { View, Text, TextInput } from "react-native";

interface TopicsInputProps {
  topics?: string;
  setTopics?: (text: string) => void;
}

const TopicsInput = ({ topics = "", setTopics }: TopicsInputProps) => {
  return (
    <View className="">
      <Text className="text-white text-lg font-bold mb-2">Temas a tratar:</Text>
       <View className="h-0.5 bg-[#8ECAE6] opacity-60 mb-6 mx-0 rounded-full w-full" />
      <TextInput
        className="bg-white p-3 rounded-md h-32 text-black"
        placeholder="Describe los temas que deseas cubrir"
        multiline
        numberOfLines={4}
        value={topics}
        onChangeText={(text) => setTopics && setTopics(text)}
      />
    </View>
  );
};

export default TopicsInput;