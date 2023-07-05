import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackParamList } from "../navigators/GameNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  getUserStartFirst,
  saveUserStartFirst,
  saveNumberOfMatches,
  getNumberOfMatches,
} from "../storage/setting";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home" | "Game"
>;

const SettingScreen = ({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) => {
  const onPress = () => navigation.goBack();

  const [matches, setMatches] = useState("");
  const [matchError, setMatchError] = useState("");
  const [isUserFirst, setIsUserFirst] = useState(true);

  const handleMatchChange = (text: string) => {
    const value = Number(text);
    if (isNaN(value) || value < 1 || value > 1000) {
      setMatchError("Please enter a valid number of matches (1-1000).");
    } else {
      setMatches(value.toString());
      setMatchError("");
    }
  };

  const onPressUserFirst = () => {
    setIsUserFirst(!isUserFirst);
    saveUserStartFirst(!isUserFirst);
  };

  useEffect(() => {
    getUserStartFirst().then((userStartFirst) => {
      setIsUserFirst(userStartFirst);
    });
  }, []);

  useEffect(() => {
    const saveMatches = async () => {
      await saveNumberOfMatches(matches.toString());
    };

    saveMatches();
  }, [matches]);

  useEffect(() => {
    const retrieveMatches = async () => {
      try {
        const numberOfMatches = await getNumberOfMatches();
        if (numberOfMatches) {
          setMatches(numberOfMatches.toString());
        }
      } catch (error) {
        console.log("Error retrieving number of matches:", error);
      }
    };

    retrieveMatches();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>How start First</Text>

      <View style={styles.appButtonContainer}>
        <TouchableOpacity onPress={onPressUserFirst}>
          <Text style={styles.appButtonText}>
            {isUserFirst ? "You" : "Computer"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.headerText}>Number of much matches</Text>
      <Text>Current amount {matches}</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleMatchChange}
        value={matches}
        placeholder="Write the number of matches"
        keyboardType="numeric"
      />
      <View style={styles.appButtonContainer}>
        <TouchableOpacity>
          <Text style={styles.appButtonText} onPress={onPress}>
            Back
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
    marginTop: 8,
    marginBottom: 8,
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
  input: {
    height: 50,
    margin: 8,
    borderWidth: 1,
    padding: 8,
  },
});

export default SettingScreen;
