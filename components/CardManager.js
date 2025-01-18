import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const CardManager = ({ addCard, deleteCurrentCard }) => {
  return (
    <View style={{ flexDirection: "row", marginBottom: 20, marginTop: 10 }}>
      {/* Add Card Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#1e90ff",
          padding: 10,
          borderRadius: 5,
          marginRight: 10,
        }}
        onPress={addCard}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Add Card</Text>
      </TouchableOpacity>

      {/* Delete Card Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#ff4500",
          padding: 10,
          borderRadius: 5,
        }}
        onPress={deleteCurrentCard}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Delete Card</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardManager;
