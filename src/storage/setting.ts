import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserStartFirst = async (value: boolean) => {
  await AsyncStorage.setItem("whoStartFirst", value ? "1" : "0");
  console.log("Data stored successfully!");
};

export const getUserStartFirst = async () => {
  const value = await AsyncStorage.getItem("whoStartFirst");
  if (value !== null) {
    console.log("Retrieved data:", value);
    return value === "1" ? true : false;
  } else {
    return true;
  }
};
