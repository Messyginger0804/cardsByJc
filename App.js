import React, { useState } from "react";
import { View } from "react-native";
import CardSwiper from "./components/CardSwiper";

const App = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addCard = () => {
    const newCard = { id: Date.now(), content: `Card-${Date.now()}` };
    setCards((prev) => [...prev, newCard]);
    setCurrentIndex(cards.length); // Focus on the newly added card
  };

  const deleteCurrentCard = () => {
    if (cards.length > 0) {
      const updatedCards = cards.filter((_, index) => index !== currentIndex);
      setCards(updatedCards);
      setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#111" }}>
      <CardSwiper
        cards={cards}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        addCard={addCard}
        deleteCurrentCard={deleteCurrentCard}
      />
    </View>
  );
};

export default App;
