import { View, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import GameScreen from "../screens/GameScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Game: {
    isUserFirst: boolean;
    numberOfMatches: number;
    maxMatchesPerRound: number;
  };
};
const Stack = createStackNavigator<RootStackParamList>();

const GameNavigator = () => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginTop: top, marginBottom: bottom }]}>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default GameNavigator;
