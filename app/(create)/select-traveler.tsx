import Card from "@/component/Card";
import CustomButton from "@/component/CustomButton";
import TravelList from "@/constants/travelList";
import { useGlobalContext } from "@/context/GlobalContext";
import { CardProps } from "@/types/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface handleSelectProps {
  id: number;
  title: string;
  desc: string;
  icon: string;
  people: string;
}

const SelectTraveler = () => {
  const router = useRouter();
  const { trip, setTrip } = useGlobalContext();
  const [selectOption, setSelectOption] = useState<number>(0);


  const handleSelect = (item: handleSelectProps) => {
    if (!item) return;

    setSelectOption(item.id);

    setTrip(
      trip && {
        ...trip,
        traveler: {
          id: item.id,
          title: item.title,
          desc: item.desc,
          icon: item.icon,
          people: item.people,
        },
      }
    );

  };

  const handleContinue = () => {
    if (selectOption === 0) {
      Alert.alert("Error", "Who is going?");
      return;
    }

    router.push("/(create)/select-dates");
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

        <Text className="font-Outfit-Regular text-lg">Traveler</Text>
      </View>
      <View className="space-y-5">
        <Text className="font-Outfit-Bold text-4xl">Who's Going</Text>
        <Text className="font-Outfit-Regular text-lg tracking-wider">
          Choose Your Style
        </Text>
      </View>

      <FlatList
        data={TravelList}
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

export default SelectTraveler;
