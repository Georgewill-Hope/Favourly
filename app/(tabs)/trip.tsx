import StartNewTrip from "@/component/StartNewTrip";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Trip = () => {
  const [trips, setTrips] = useState([]);
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <View className="flex-row items-center justify-between">
        <Text className="font-Outfit-Bold text-2xl tracking-wider">
          My Trips
        </Text>
        <Ionicons name="add-circle" size={35} color="#f97316" />
      </View>

      {trips.length === 0 && <StartNewTrip />}
    </SafeAreaView>
  );
};

export default Trip;
