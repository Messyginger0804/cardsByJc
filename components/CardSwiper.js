import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const CardSwiper = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      if (translateX.value > 50 && currentIndex > 0) {
        translateX.value = withSpring(0);
        runOnJS(setCurrentIndex)(currentIndex - 1);
      } else if (translateX.value < -50 && currentIndex < cards.length - 1) {
        translateX.value = withSpring(0);
        runOnJS(setCurrentIndex)(currentIndex + 1);
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const addCard = () => {
    const newCard = { id: Date.now(), content: `Card-${Date.now()}` };
    setCards((prev) => [...prev, newCard]);
  };

  const deleteCurrentCard = () => {
    if (cards.length === 0) {
      Alert.alert("Error", "No cards to delete!");
      return;
    }

    const updatedCards = cards.filter((_, index) => index !== currentIndex);
    setCards(updatedCards);
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#111" }}>
      {/* Top Buttons */}
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <TouchableOpacity
          style={{ backgroundColor: "#1e90ff", padding: 10, borderRadius: 5, marginRight: 10 }}
          onPress={addCard}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "#ff4500", padding: 10, borderRadius: 5 }}
          onPress={deleteCurrentCard}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Delete Card</Text>
        </TouchableOpacity>
      </View>

      {/* Cards */}
      {cards.length > 0 ? (
        <PanGestureHandler onGestureEvent={gestureHandler}>
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
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              {cards[currentIndex]?.content || "No Card Selected"}
            </Text>
          </Animated.View>
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
