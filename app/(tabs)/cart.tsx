import { Text, View, TextInput, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { AddIcon, SunIcon } from "@/components/ui/icon";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";

export default function CartScreen() {
  const [lists, setList] = useState([]);
  const [count, setCount] = useState(1);
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <VStack space="2xl">
        <View style={{ marginVertical: 30 }}>
          <Text className="text-2xl font-bold p-4">Your order</Text>
        </View>
        <FlatList
          className="h-[80%]"
          data={lists}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Card key={item._id} variant="outline" className="m-4 p-4">
              <View className="flex flex-row gap-4">
                <Image
                  source={{
                    uri:
                      `${process.env.EXPO_PUBLIC_API_URL}` +
                      item?.product?.image,
                  }}
                  className="block w-32 h-32 rounded-xl"
                  alt=""
                />
                <View className="flex flex-col justify-between">
                  <Text className="font-bold text-lg text-black">
                    {item?.product?.name}
                  </Text>
                  <Text className="font-bold text-lg text-black">
                    {item?.product?.price}$
                  </Text>
                  <View className="flex flex-row gap-2 flex-end">
                    <Button className="w-0.5 rounded-full bg-black">
                      <ButtonIcon as={AddIcon} className="text-white" />
                    </Button>
                    <Text className="text-center text-black my-2">{count}</Text>
                    <Button className="w-0.5 rounded-full bg-black">
                      <ButtonIcon as={SunIcon} className="text-white" />
                    </Button>
                  </View>
                </View>
              </View>
            </Card>
          )}
        />
      </VStack>
    </SafeAreaView>
  );
}
