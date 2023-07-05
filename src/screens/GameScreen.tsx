import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import React, { FC, useState, useEffect } from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigators/GameNavigator";
import { getComputerMatchesTurn } from "../ai/logic";

type GameScreenNavigationProp = NavigationProp<RootStackParamList>;

type GameScreenRouteProp = RouteProp<RootStackParamList, "Game">;

export type GameScreenProps = {
  navigation: GameScreenNavigationProp;
  route: GameScreenRouteProp;
};

const GameScreen: FC<GameScreenProps> = ({ navigation, route }) => {
  const { isUserFirst, numberOfMatches, maxMatchesPerRound } = route.params;

  const [matchesLeft, setMatchesLeft] = useState(numberOfMatches);
  const [currentUserMatches, setCurrentUserMatches] = useState(0);
  const [computerMatches, setComputerMatches] = useState(0);
  const [userTurn, setUserTurn] = useState(isUserFirst);

  const takeMatches = (matches: number) => {
    setMatchesLeft(matchesLeft - matches);

    if (userTurn) {
      setCurrentUserMatches(currentUserMatches + matches);
    } else {
      setComputerMatches(computerMatches + matches);
    }
  };

  useEffect(() => {
    if (userTurn) {
      return;
    } else {
      setTimeout(() => {
        takeMatches(getComputerMatchesTurn(matchesLeft, maxMatchesPerRound));
        setUserTurn(true);
      }, 1000);
    }
  }, [userTurn]);

  const takeUserTurn = (matches: number) => {
    if (!userTurn) {
      return;
    }

    takeMatches(matches);

    setUserTurn(false);
  };

  useEffect(() => {
    if (matchesLeft === 0) {
      const winner = currentUserMatches % 2 === 0 ? "User" : "Computer";
      alert(`Game Over. ${winner} Wins.`);
    }
  }, [matchesLeft]);

  const onPressBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.headerText}>{matchesLeft}</Text>
        <Text style={styles.headerText}>🔥</Text>
      </View>
      <Text>Your Matches: {currentUserMatches}</Text>
      <Text>Computer's Matches: {computerMatches}</Text>
      <View style={styles.buttonsContainer}>
        <Button
          title="Take 1"
          onPress={() => takeUserTurn(1)}
          disabled={!userTurn || matchesLeft === 0}
        />
        <Button
          title="Take 2"
          onPress={() => takeUserTurn(2)}
          disabled={!userTurn || matchesLeft < 2}
        />
        <Button
          title="Take 3"
          onPress={() => takeUserTurn(3)}
          disabled={!userTurn || matchesLeft < 3}
        />
      </View>

      <TouchableOpacity style={styles.appButtonContainer} onPress={onPressBack}>
        <Text style={styles.appButtonText}>Menu</Text>
      </TouchableOpacity>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
});

export default GameScreen;
