import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import CustomButton from "./CustomButton";

const StartNewTrip = () => {
  const router = useRouter();
  return (
    <View className="items-center w-full" style={{ marginTop: 50 }}>
      <Ionicons
        name="location-sharp"
        size={24}
        color="black"
        className="mb-4"
      />
      <Text className="font-Outfit-Medium text-center text-2xl">
        No trips planned yet
      </Text>
      <Text className="font-Outfit-Regular text-lg text-center">
        Looks like it's time to plan a new travel experience!
      </Text>
      <Text className="font-Outfit-Regular text-lg text-center mb-5">
        get started below
      </Text>

      <CustomButton
        title="Start a new trip"
        handleSubmit={() => router.push("/(create)/search-place")}
      />
    </View>
  );
};

export default StartNewTrip;
