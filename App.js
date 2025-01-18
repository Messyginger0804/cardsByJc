import React, { useState } from "react";
import { View } from "react-native";
import CardSwiper from "./components/CardSwiper";
// import CardManager from "./components/CardManager";

const App = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addCard = () => {
    const newCard = { id: Date.now(), content: `Card-${Date.now()}` };
    setCards((prev) => [...prev, newCard]);
    setCurrentIndex(cards.length);
  };

  const deleteCurrentCard = () => {
    const updatedCards = cards.filter((_, index) => index !== currentIndex);
    setCards(updatedCards);
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111",
      }}
    >
      {/* <CardManager addCard={addCard} deleteCurrentCard={deleteCurrentCard} /> */}
      <CardSwiper
        cards={cards}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </View>
  );
};

export default App;
