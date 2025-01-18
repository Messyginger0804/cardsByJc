import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import Card from "./Card";

const CardSwiper = ({ cards, currentIndex, setCurrentIndex, addCard, deleteCurrentCard }) => {
  const translateX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      if (translateX.value > 50 && currentIndex > 0) {
        translateX.value = withSpring(0);
        setCurrentIndex((prevIndex) => prevIndex - 1);
      } else if (translateX.value < -50 && currentIndex < cards.length - 1) {
        translateX.value = withSpring(0);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Card Manager Buttons */}
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
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

      {/* Display Current Card */}
      {cards.length > 0 ? (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <View>
            <Card content={cards[currentIndex]?.content} animatedStyle={animatedStyle} />
          </View>
        </PanGestureHandler>
      ) : (
        <Text style={{ color: "#fff", fontSize: 16 }}>No cards available. Add one!</Text>
      )}

      {/* Navigation Arrows */}
      {cards.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 50,
            width: "100%",
            justifyContent: "space-between",
            paddingHorizontal: 40,
          }}
        >
          {/* Previous Arrow */}
          <TouchableOpacity
            style={{
              backgroundColor: currentIndex > 0 ? "#1e90ff" : "#555",
              padding: 15,
              borderRadius: 30,
            }}
            onPress={() => {
              if (currentIndex > 0) {
                setCurrentIndex((prevIndex) => prevIndex - 1);
              }
            }}
            disabled={currentIndex === 0}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>{"<"}</Text>
          </TouchableOpacity>

          {/* Next Arrow */}
          <TouchableOpacity
            style={{
              backgroundColor: currentIndex < cards.length - 1 ? "#1e90ff" : "#555",
              padding: 15,
              borderRadius: 30,
            }}
            onPress={() => {
              if (currentIndex < cards.length - 1) {
                setCurrentIndex((prevIndex) => prevIndex + 1);
              }
            }}
            disabled={currentIndex === cards.length - 1}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>{">"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CardSwiper;
