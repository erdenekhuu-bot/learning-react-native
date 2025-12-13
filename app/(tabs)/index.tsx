import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize: 30, color: 'white' }}>HOME SCREEN</Text>
        </View>
  );
}
