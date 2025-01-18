import React from "react";
import { Text } from "react-native";
import Animated from "react-native-reanimated";

const Card = ({ content, animatedStyle }) => {
  return (
    <Animated.View
      style={[
        {
          width: 200,
          height: 100,
          backgroundColor: "#1e90ff",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        },
        animatedStyle,
      ]}
    >
      <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>
        {content}
      </Text>
    </Animated.View>
  );
};

export default Card;
