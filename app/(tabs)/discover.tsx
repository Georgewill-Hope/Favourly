import LocationSearch from "@/component/LoactionSearch";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Discover = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="p-5 flex-1 bg-white">
      <View className="flex-row items-center gap-5 mb-7">
        <Pressable
          className="bg-black w-fit p-3 rounded-full"
          onPress={() => router.back()}
        >
          <MaterialIcons name="keyboard-backspace" size={22} color="white" />
        </Pressable>

        <Text className="font-Outfit-Regular text-lg">Search</Text>
      </View>

      <LocationSearch />
    </SafeAreaView>
  );
};

export default Discover;
