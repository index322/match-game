import React, { FC } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type ButtonToTakeProps = {
  onPress: () => void;
  disabled?: boolean;
  buttonText: string;
};

const ButtonToTake: FC<ButtonToTakeProps> = ({
  onPress,
  disabled,
  buttonText,
}) => {
  return (
    <TouchableOpacity
      style={styles.appButtonContainer}
      onPress={onPress}
      disabled={disabled}
    >
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
    width: "30%",
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
});

export default ButtonToTake;
