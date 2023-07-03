import { View, Text, StyleSheet } from "react-native";
import React from "react";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});

export default HomeScreen;
