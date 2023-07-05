import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { RootStackParamList } from "../navigators/GameNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { getNumberOfMatches, getUserStartFirst } from "../storage/setting";
import MainButton from "../components/MainButton";

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
      <MainButton onPress={onPressGame} buttonText="▶️ Start" />
      <MainButton onPress={onPressSettings} buttonText="⚙️ Settings" />
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
