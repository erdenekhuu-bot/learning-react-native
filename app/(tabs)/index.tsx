import { Image } from "expo-image";
import { Text, View, TextInput, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";

export default function HomeScreen() {
  const [text, onChangeText] = useState("");

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
        </View>
        <View>
          <Text>Lorem 1324</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
