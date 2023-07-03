import { View, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

const GameNavigator = () => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: top,
        paddingBottom: bottom,
        backgroundColor: "white",
      }}
    >
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default GameNavigator;
