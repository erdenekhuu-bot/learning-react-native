import { Text, View, TextInput, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import { useState, useEffect } from "react";
import { Divider } from "@/components/ui/divider";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Input, InputField } from "@/components/ui/input";
import { AddIcon } from "@/components/ui/icon";
import { ScrollView } from "react-native";
import { Heading } from "@/components/ui/heading";
import myImage from "../../assets/images/favorite-icon.svg";

export default function HomeScreen() {
  const [text, onChangeText] = useState("");
  const [category, setCategory] = useState([]);
  const [index, setIndex] = useState("");
  const [product, setProduct] = useState([]);

  async function makeSubscribe(id: string) {
    await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/subscribe`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: id }),
    });
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/api/category`,
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
        setCategory(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProducts(params: string) {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/api/product?kind=${params}`,
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
        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchProducts(index);
  }, [index]);

  useEffect(() => {
    async function searchProducts(params: string) {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/api/product/search`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.EXPO_PUBLIC_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: params }),
          },
        );
        if (!response.ok) {
          throw new Error("Ohh man, something happened on request");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.log(err);
      }
    }

    searchProducts(text);
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

        <View className="flex flex-row flex-wrap justify-evenly">
          {category.map((item: any) => (
            <Button
              key={item._id}
              className="mx-2 my-1 px-4 py-2 bg-[#846046] rounded-full"
              onPress={() => {
                setIndex(item._id);
              }}
            >
              <ButtonText className="text-white font-bold">
                {item.name}
              </ButtonText>
            </Button>
          ))}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          className="h-[80%]"
        >
          <View className="flex flex-row flex-wrap justify-evenly px-4">
            {product.map((item: any, index: number) => (
              <Card key={index} variant="outline" className="m-4">
                <Image
                  source={{
                    uri: `${process.env.EXPO_PUBLIC_API_URL}` + item.image,
                  }}
                  className="w-32 h-32"
                  alt=""
                />

                <Heading size="md">
                  <Text className="font-bold text-black">{item.name}</Text>
                </Heading>
                <Divider className="my-0.5" />
                <View className="flex flex-row justify-between items-center">
                  <Text className="font-bold">${item.price}</Text>
                  <Button
                    className="w-4 rounded-full bg-[#846046]"
                    onPress={async () => await makeSubscribe(item._id)}
                  >
                    <ButtonIcon as={AddIcon} className="text-white" />
                  </Button>
                </View>
              </Card>
            ))}
          </View>
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
}
