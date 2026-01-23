import { Text, View, TextInput, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import { VStack } from "@/components/ui/vstack";
import { FlatList } from "react-native";
import { AddIcon, SunIcon } from "@/components/ui/icon";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";

export default function FavoriteScreen() {
  const [favoritelist, setFavorite] = useState([]);
  const [text, onChangeText] = useState("");
  useEffect(() => {
    async function fetchFavorite() {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/api/product/bookmark`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.EXPO_PUBLIC_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ param: "1" }),
          },
        );
        if (!response.ok) {
          throw new Error("Ohh man, something happened on request");
        }
        const data = await response.json();
        setFavorite(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchFavorite();
  }, [text]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <VStack space="2xl">
        <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
          <TextInput
            onChangeText={onChangeText}
            value={text}
            className="block border border-black rounded-2xl px-4 py-2"
          />
        </View>
        <FlatList
          className="h-[80%]"
          data={favoritelist}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Card key={item._id} variant="outline" className="m-4 p-4">
              <View className="flex flex-row gap-4">
                <Image
                  source={{
                    uri: `${process.env.EXPO_PUBLIC_API_URL}` + item?.image,
                  }}
                  className="block w-32 h-32 rounded-xl"
                  alt=""
                />
                <View className="flex flex-col justify-between">
                  <Text className="font-bold text-lg text-black">
                    {item?.name}
                  </Text>
                  <Text className="font-bold text-lg text-black">
                    {item?.price}$
                  </Text>
                  <View className="flex flex-row gap-2 flex-end">
                    <Button className="w-0.5 rounded-full bg-black">
                      <ButtonIcon as={AddIcon} className="text-white" />
                    </Button>

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
