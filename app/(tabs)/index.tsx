import { Text, View, TextInput, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import { useState, useEffect } from "react";
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';

export default function HomeScreen() {
  const [text, onChangeText] = useState("");
  const [category, setCategory]=useState([])
  const [index, setIndex]=useState('')
  const [product, setProduct]=useState([])

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("http://192.168.6.144:7001/api/category", {method: "GET"});
        if (!response.ok) {
          throw new Error("Ohh man, something happened on request");
        }
        const data = await response.json();
        setCategory(data);
      } catch (err) {
         console.log(err)
      }
    }
    fetchCategories();
  }, []);

 useEffect(() => {
   async function fetchProducts(params) {
     try {
       const response = await fetch(`http://192.168.6.144:7001/api/product?kind=${params}`, { method: "GET" });
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
                      <Button key={item._id} style={{margin: 4}} onPress={()=>{setIndex(item._id)}}>
                        <ButtonText>{item.name}</ButtonText>
                      </Button>
                    ))}
                </View>
        <View
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          {product.map((item: any, index:number) => (
            <Card key={index} variant="outline">
             <Image
                  source={{
                    uri: 'http://192.168.6.144:7001'+item.image
                  }}
                  alt=""
                />
              <Text>{item.name}</Text>
            </Card>
          ))}
        </View>

      </VStack>
    </SafeAreaView>
  );
}
