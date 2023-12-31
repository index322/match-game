import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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
import Input from "../components/Input";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home" | "Game"
>;

const SettingScreen = ({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) => {
  const onPressBack = () => navigation.goBack();

  const [matches, setMatches] = useState("");
  const [isUserFirst, setIsUserFirst] = useState(true);

  const showInvalidMatchesInputError = () => {
    Alert.alert("Please enter valid number of matches");
  };

  const handleMatchNumberSave = () => {
    const matchesNumber = Number(matches);

    if (Number.isNaN(matchesNumber)) {
      showInvalidMatchesInputError();
      setMatches("");
    } else {
      if (matchesNumber % 2 === 0) {
        Alert.alert("Number of matches should be odd");
        return;
      }

      saveNumberOfMatches(matches);
      Keyboard.dismiss();
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
    getNumberOfMatches().then((matches) => {
      setMatches(matches.toString());
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <Text style={styles.headerText}>How start First</Text>

      <TouchableOpacity
        style={styles.appButtonContainer}
        onPress={onPressUserFirst}
      >
        <Text style={styles.appButtonText}>
          {isUserFirst ? "🧑 You" : "🤖 Computer"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.headerText}>Number of much matches</Text>
      <Input
        onChangeText={setMatches}
        value={matches}
        placeholder="Write the number of matches"
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.appButtonContainer}
        onPress={handleMatchNumberSave}
      >
        <Text style={styles.appButtonText}>Save match number</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.appButtonContainer} onPress={onPressBack}>
        <Text style={styles.appButtonText}>🔙 Back</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 25,
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
});

export default SettingScreen;
