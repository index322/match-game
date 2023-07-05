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

export const saveNumberOfMatches = async (value: string) => {
  try {
    await AsyncStorage.setItem("numberOfMatches", value);
    console.log("Number of Matches stored", value);
  } catch (error) {
    console.log("Error saving number of Matches:", error);
  }
};
export const getNumberOfMatches = async () => {
  const value = await AsyncStorage.getItem("numberOfMatches");
  if (value !== null) {
    console.log("Retrieved number of Matches", value);
    return Number(value);
  } else {
    console.log("No Number of Matches found.");
    return 25;
  }
};
