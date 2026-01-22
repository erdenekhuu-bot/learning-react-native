import { Text, View, TextInput, SafeAreaView } from "react-native";
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
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <FlatList
        data={lists}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View className="p-4 border-b border-gray-200 w-full">
            <Text className="text-lg font-semibold">{item.name}</Text>
            <Text className="text-gray-600">Price: ${item.price}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
