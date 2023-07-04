import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { RootStackParamList } from "../navigators/GameNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const SettingScreen = ({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) => {
  const onPress = () => navigation.navigate("Home");

  const [matches, setMatches] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>How start First?</Text>

      <View style={styles.appButtonContainer}>
        <TouchableOpacity>
          <Text style={styles.appButtonText}>You</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.appButtonContainer}>
        <TouchableOpacity>
          <Text style={styles.appButtonText}>Computer</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.headerText}>How much matches?</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMatches}
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
