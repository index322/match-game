import React, { FC } from "react";
import { TextInput, StyleSheet } from "react-native";

type InputProps = {
  onChangeText: (text: string) => void;
  value: string;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
};

const Input: FC<InputProps> = ({
  onChangeText,
  value,
  placeholder,
  keyboardType = "default",
}) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "60%",
  },
});

export default Input;
