import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const CardManager = ({ addCard, deleteCurrentCard }) => {
  return (
    <View className="flex-row mb-5">
      <TouchableOpacity
        className="bg-blue-500 px-4 py-2 rounded-md ml-3"
        onPress={addCard}
      >
        <Text className="text-white font-bold">Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-red-500 px-4 py-2 rounded-md ml-3"
        onPress={deleteCurrentCard}
      >
        <Text className="text-white font-bold">Delete Card  1212121</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardManager;
