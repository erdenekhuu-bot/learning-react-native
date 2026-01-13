import { Image } from "expo-image";
import { Text, View, TextInput, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import { useState, useEffect } from "react";
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';

export default function HomeScreen() {
  const [text, onChangeText] = useState("");
  const [category, setCategory]=useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        const response = await fetch("http://192.168.6.144:7001/api/category", {method: "GET"});
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategory(data);
      } catch (err) {
         console.log(err)
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white"
      }}
    >
      <VStack space="2xl">
        <View style={{marginVertical: 20, paddingHorizontal: 20}}>
          <TextInput
            style={{
              borderColor: "gray",
              borderRadius: 10,
              borderWidth: 1,
              paddingHorizontal: 10,
            }}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
       
        <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-around' }}>
            {category.map((item:any) => (
              <Button key={item._id} style={{margin: 4}} onPress={()=>{console.log(`clicked ${item.name}`)}}>
                <ButtonText>{item.name}</ButtonText>
              </Button>
            ))}
        </View>
        <View><Text>1</Text></View>
      </VStack>
    </SafeAreaView>
  );
}
