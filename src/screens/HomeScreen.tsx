import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { RootStackParamList } from "../navigators/GameNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { getNumberOfMatches, getUserStartFirst } from "../storage/setting";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Settings"
>;
const HomeScreen = ({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) => {
  const onPressSettings = () => navigation.navigate("Settings");

  const onPressGame = async () => {
    console.log("game pressed");

    const isUserFirst = await getUserStartFirst();
    const numberOfMatches = await getNumberOfMatches();

    console.log("retrieved values");

    navigation.navigate("Game", {
      isUserFirst: isUserFirst,
      numberOfMatches: numberOfMatches,
      maxMatchesPerRound: 3,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Match Game</Text>
      <TouchableOpacity onPress={onPressGame} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>▶️ Start</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onPressSettings}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>⚙️ Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

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
