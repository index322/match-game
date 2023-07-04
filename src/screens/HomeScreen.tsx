import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigators/GameNavigator";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Settings"
>;

function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
  const onPressSettings = () => navigation.navigate("Settings");
  const onPressGame = () => navigation.navigate("Game");
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Match Game</Text>
      <View style={styles.appButtonContainer}>
        <TouchableOpacity>
          <Text style={styles.appButtonText} onPress={onPressGame}>
            Start
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.appButtonContainer}>
        <TouchableOpacity>
          <Text style={styles.appButtonText} onPress={onPressSettings}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 30,
    paddingBottom: 10,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#ffbd03",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "60%",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  appButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default HomeScreen;
