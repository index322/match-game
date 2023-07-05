import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TextInput,
} from "react-native";
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
  const [customMatches, setCustomMatches] = useState(0);
  const [currentUserMatches, setCurrentUserMatches] = useState(0);
  const [computerMatches, setComputerMatches] = useState(0);
  const [userTurn, setUserTurn] = useState(isUserFirst);
  const [gameOver, setGameOver] = useState(false);

  const takeMatches = (matches: number) => {
    setMatchesLeft(matchesLeft - matches);

    if (userTurn) {
      setCurrentUserMatches(currentUserMatches + matches);
    } else {
      setComputerMatches(computerMatches + matches);
    }
  };

  const handleCustomMatchesChange = (text: string) => {
    const input = parseInt(text, 10);
    setCustomMatches(isNaN(input) ? 0 : input);
  };

  const takeCustomTurn = () => {
    if (!userTurn || customMatches > matchesLeft) {
      return;
    }

    takeMatches(customMatches);

    setUserTurn(false);
    Keyboard.dismiss();
  };

  const restartGame = () => {
    setMatchesLeft(numberOfMatches);
    setCurrentUserMatches(0);
    setComputerMatches(0);
    setUserTurn(isUserFirst);
    setGameOver(false);
  };

  useEffect(() => {
    if (matchesLeft === 0) {
      const winner = currentUserMatches % 2 === 0 ? "User" : "Computer";
      alert(`Game Over! ${winner} Wins! 🎊`);
      setGameOver(true);
    }
  }, [matchesLeft]);

  useEffect(() => {
    if (userTurn) {
      return;
    } else {
      setTimeout(() => {
        takeMatches(getComputerMatchesTurn(matchesLeft, maxMatchesPerRound));
        setUserTurn(true);
      }, 500);
    }
  }, [userTurn]);

  const takeUserTurn = (matches: number) => {
    if (!userTurn) {
      return;
    }

    takeMatches(matches);

    setUserTurn(false);
  };

  const onPressBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.headerText}>{matchesLeft}</Text>
        <Text style={styles.headerText}>🔥</Text>
      </View>
      <Text style={styles.headerText}>Your Matches: {currentUserMatches}</Text>
      <Text style={styles.headerText}>
        Computer's Matches: {computerMatches}
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.appButtonContainerToTake}
          onPress={() => takeUserTurn(1)}
          disabled={!userTurn || matchesLeft === 0}
        >
          <Text style={styles.appButtonText}>Take 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.appButtonContainerToTake}
          onPress={() => takeUserTurn(2)}
          disabled={!userTurn || matchesLeft === 0}
        >
          <Text style={styles.appButtonText}>Take 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.appButtonContainerToTake}
          onPress={() => takeUserTurn(3)}
          disabled={!userTurn || matchesLeft === 0}
        >
          <Text style={styles.appButtonText}>Take 3</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        onChangeText={handleCustomMatchesChange}
        value={customMatches.toString()}
        placeholder="Enter number"
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.appButtonContainer}
        onPress={takeCustomTurn}
        disabled={!userTurn || matchesLeft === 0}
      >
        <Text style={styles.appButtonText}>Take Custom</Text>
      </TouchableOpacity>

      {gameOver && (
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={restartGame}
        >
          <Text style={styles.appButtonText}>🔄 Restart</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.appButtonContainer} onPress={onPressBack}>
        <Text style={styles.appButtonText}>🔙 Menu</Text>
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
    fontSize: 25,
    paddingBottom: 10,
    textAlign: "center",
  },
  appButtonContainerToTake: {
    elevation: 8,
    backgroundColor: "#ffbd03",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "30%",
    marginHorizontal: 2,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#ffbd03",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "50%",
    marginHorizontal: 2,
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
    borderWidth: 5,
    borderColor: "#ffbd03",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.25,
    elevation: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "50%",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
});

export default GameScreen;
