import React from "react";
import { View, Text } from "react-native";

const Card = ({ content, animatedStyle }) => {
  return (
    <View
      className="w-64 h-40 bg-blue-800 rounded-xl shadow-2xl justify-center items-center border border-blue-300"
      style={animatedStyle}
    >
      <Text className="text-white text-lg font-bold text-center">
        {content}
      </Text>
    </View>
  );
};

export default Card;
