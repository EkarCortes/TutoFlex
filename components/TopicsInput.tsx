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