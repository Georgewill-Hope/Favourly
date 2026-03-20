import Card from "@/component/Card";
import CustomButton from "@/component/CustomButton";
import budgetList from "@/constants/budgetList";
import { useGlobalContext } from "@/context/GlobalContext";
import { CardProps } from "@/types/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const budget = () => {
  const [selectOption, setSelectOption] = useState<number>(0);
  const router = useRouter();
  const { trip, setTrip } = useGlobalContext();

  const handleSelect = (item: CardProps) => {
    if (!item) return;

    setSelectOption(item.id);

    setTrip(
      trip && {
        ...trip,
        budget: item.title,
      }
    );
  };

  const handleContinue = () => {
    if (selectOption === 0) {
      Alert.alert("Error", "Select your budget");
      return;
    }

    router.push("/(create)/review-trip")
    
  };
  return (
    <SafeAreaView className="p-5 flex-1 bg-white">
      <View className="flex-row items-center gap-5 mb-7">
        <Pressable
          className="bg-black w-fit p-3 rounded-full"
          onPress={() => router.back()}
        >
          <MaterialIcons name="keyboard-backspace" size={22} color="white" />
        </Pressable>

        <Text className="font-Outfit-Regular text-lg">Budget</Text>
      </View>

      <View className="space-y-5">
        <Text className="font-Outfit-Bold text-4xl">Budget</Text>
        <Text className="font-Outfit-Regular text-lg tracking-wider">
          Choose your style
        </Text>
      </View>

      <FlatList
        data={budgetList}
        keyExtractor={(item) => String(item.id)}
        style={{ marginTop: 10 }}
        renderItem={({ item }) => (
          <Card
            {...item}
            selectOption={selectOption}
            onPress={() => handleSelect(item)}
          />
        )}
      />

      <CustomButton
        title="Continue"
        handleSubmit={handleContinue}
        disabled={selectOption === 0}
      />
    </SafeAreaView>
  );
};

export default budget;
