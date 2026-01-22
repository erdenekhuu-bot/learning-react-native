import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";

export default function CartScreen() {
  const [lists, setList] = useState([]);
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/api/subscribe`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.EXPO_PUBLIC_TOKEN}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Ohh man, something happened on request");
        }
        const data = await response.json();
        setList(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCategories();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30 }}>CART SCREEN</Text>
    </View>
  );
}
