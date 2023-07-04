import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { FC } from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigators/GameNavigator";

type GameScreenNavigationProp = NavigationProp<RootStackParamList>;

type GameScreenRouteProp = RouteProp<RootStackParamList, "Game">;

export type GameScreenProps = {
  navigation: GameScreenNavigationProp;
  route: GameScreenRouteProp;
};

const GameScreen: FC<GameScreenProps> = ({ navigation, route }) => {
  const { isUserFirst, numberOfMatches, maxMatchesPerRound } = route.params;
  const onPress = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.headerText}>25</Text>
      </View>

      <View style={styles.appButtonContainer}>
        <TouchableOpacity>
          <Text style={styles.appButtonText} onPress={onPress}>
            Menu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 30,
    paddingBottom: 10,
    textAlign: "center",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#ffbd03",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "40%",
  },
  appButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    textAlign: "center",
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#ffbd03",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameScreen;
