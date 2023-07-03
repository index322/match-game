import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import GameNavigator from "./src/navigators/GameNavigator";
import { View, StyleSheet } from "react-native";
import React from "react";

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <NavigationContainer>
          <GameNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
});
