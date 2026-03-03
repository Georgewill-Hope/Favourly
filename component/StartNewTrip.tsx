import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, View } from "react-native";
import CustomButton from "./CustomButton";

const StartNewTrip = () => {
  return (
    <View className="items-center w-full" style={{ marginTop: 50 }}>
      <Ionicons name="location-sharp" size={24} color="black" />
      <Text className="font-Outfit-Medium text-center text-xl">
        No trips planned yet
      </Text>
      <Text className="font-Outfit-Regular text-lg text-center">
        Looks like it's time to plan a new travel experience!
      </Text>
      <Text className="font-Outfit-Regular text-lg text-center">
        get started below
      </Text>

      <CustomButton title="Start a new trip" handleSubmit={() => {}} />
    </View>
  );
};

export default StartNewTrip;
