import React, { FC } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type MainButtonProps = {
  onPress: () => void;
  buttonText: string;
};

const MainButton: FC<MainButtonProps> = ({ onPress, buttonText }) => {
  return (
    <TouchableOpacity style={styles.appButtonContainer} onPress={onPress}>
      <Text style={styles.appButtonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default MainButton;
