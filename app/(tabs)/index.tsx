import { Image } from "expo-image";
import { Text, View, TextInput, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import { useState, useEffect } from "react";

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
        console.log(data)
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
      <View>
        <View style={{marginVertical: 50, paddingHorizontal: 20}}>
          <TextInput
            style={{
              borderColor: "gray",
              borderRadius: 10,
              borderWidth: 1,
              marginBottom: 10,
              paddingHorizontal: 10,
            }}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View>
          <Text style={{ fontSize: 30, textAlign: "center" }}>HOME SCREEN</Text>
          {category.map((item: any) => (
  <Text key={item._id}>{item.name}</Text>
))}
        </View>
        <View>
          <Text>Lorem 1324</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
