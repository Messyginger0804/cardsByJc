import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const CardSwiper = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);

  // Gesture handler for swiping cards
  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      if (translateX.value > 50 && currentIndex > 0) {
        // Swipe right
        translateX.value = withSpring(0);
        setCurrentIndex((prevIndex) => prevIndex - 1);
      } else if (translateX.value < -50 && currentIndex < cards.length - 1) {
        // Swipe left
        translateX.value = withSpring(0);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        // Snap back to center
        translateX.value = withSpring(0);
      }
    },
  });

  // Animated style for swipe gesture
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Simulated NFC Read
  const simulateNFCRead = () => {
    // This function simulates reading data from an NFC device
    return `Card-${Date.now()}`; // Generate a unique card ID
  };

  // Add a new card
  const addCard = () => {
    const nfcData = simulateNFCRead(); // Replace this with actual NFC data
    if (!nfcData) {
      Alert.alert("Error", "Failed to read NFC data.");
      return;
    }
    const newCard = { id: Date.now(), content: nfcData };
    setCards((prev) => [...prev, newCard]);
    setCurrentIndex(cards.length); // Set the new card as the current card
    Alert.alert("Success", `Card "${nfcData}" added!`);
  };

  // Delete the current card
  const deleteCurrentCard = () => {
    if (cards.length === 0) {
      Alert.alert("Error", "No cards to delete!");
      return;
    }

    const updatedCards = cards.filter((_, index) => index !== currentIndex);
    setCards(updatedCards);

    // Adjust the current index to prevent out-of-bounds errors
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-900">
      {/* Top Buttons */}
      <View className="flex-row flex-wrap mb-5">
        {/* Add Card */}
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-md ml-3"
          onPress={addCard}
        >
          <Text className="text-white font-bold">Add Card</Text>
        </TouchableOpacity>

        {/* Delete Card */}
        <TouchableOpacity
          className="bg-red-500 px-4 py-2 rounded-md ml-3"
          onPress={deleteCurrentCard}
        >
          <Text className="text-white font-bold">Delete Card</Text>
        </TouchableOpacity>
      </View>

      {/* Show Current Card */}
      {cards.length > 0 ? (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            className="w-64 h-40 bg-blue-800 rounded-xl shadow-2xl justify-center items-center border border-blue-300"
            style={animatedStyle}
          >
            <Text className="text-white text-lg font-bold text-center">
              {cards[currentIndex]?.content || "No Card Selected"}
            </Text>
          </Animated.View>
        </PanGestureHandler>
      ) : (
        <Text className="text-white text-lg">No cards available. Add one!</Text>
      )}

      {/* Navigation Buttons */}
      {cards.length > 1 && (
        <View className="flex-row mt-5">
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-md mx-2"
            onPress={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          >
            <Text className="text-white font-bold">{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-md mx-2"
            onPress={() =>
              setCurrentIndex((prev) => Math.min(cards.length - 1, prev + 1))
            }
          >
            <Text className="text-white font-bold">{'>'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CardSwiper;
