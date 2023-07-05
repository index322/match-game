import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  TextInput,
} from "react-native";
import React, { FC, useState, useEffect } from "react";
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
  const [matchesLeft, setMatchesLeft] = useState(numberOfMatches);
  const [currentUserMatches, setCurrentUserMatches] = useState(0);
  const [computerMatches, setComputerMatches] = useState(0);
  const [userTurn, setUserTurn] = useState(isUserFirst);
  const [n, setN] = useState(2);
  const [m, setM] = useState(3);

  const computeMatchesToTake = () => {
    let matchesToTake = matchesLeft % (m + 1);
    if (matchesToTake === 0) {
      matchesToTake = 1;
    }
    return matchesToTake;
  };

  const takeMatches = (matches) => {
    setUserTurn(!userTurn);
    setMatchesLeft(matchesLeft - matches);

    if (userTurn) {
      setCurrentUserMatches(currentUserMatches + matches);
    } else {
      setComputerMatches(computerMatches + matches);
    }
  };

  useEffect(() => {
    if (!userTurn) {
      setTimeout(() => {
        takeMatches(computeMatchesToTake());
      }, 1000); // AI takes its turn after 2 seconds
    }
  }, [userTurn]);

  useEffect(() => {
    if (matchesLeft === 0) {
      const winner = currentUserMatches % 2 === 0 ? "User" : "Computer";
      alert(`Game Over. ${winner} Wins.`);
    }
  }, [matchesLeft]);

  const onPress = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.headerText}>{matchesLeft}</Text>
      </View>
      <Text>Your Matches: {currentUserMatches}</Text>
      <Text>Computer's Matches: {computerMatches}</Text>
      <View>
        {userTurn && (
          <View>
            <Button
              title="Take 1"
              onPress={() => takeMatches(1)}
              disabled={matchesLeft === 0}
            />
            <Button
              title="Take 2"
              onPress={() => takeMatches(2)}
              disabled={matchesLeft < 2}
            />
            <Button
              title="Take 3"
              onPress={() => takeMatches(3)}
              disabled={matchesLeft < 3}
            />
          </View>
        )}
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default GameScreen;
