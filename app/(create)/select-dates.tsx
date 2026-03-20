import CustomButton from "@/component/CustomButton";
import { useGlobalContext } from "@/context/GlobalContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { SafeAreaView } from "react-native-safe-area-context";

const SelectDates = () => {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const { setTrip, trip } = useGlobalContext();


  const onDateChange = (date: Date, type: "START_DATE" | "END_DATE") => {
    if (type === "START_DATE") {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  const handleContinue = () => {
    if (!startDate || !endDate) {
      Alert.alert("Error", "Please choose your date!");
      return;
    }
    const totalNumberOfDays = endDate?.diff(startDate, "days");

    setTrip(
      trip && {
        ...trip,
        startDate: startDate,
        endDate: endDate,
        totalNumberOfDays: totalNumberOfDays + 1,
      }
    );
    router.push("/(create)/select-budget");
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

      <View
        style={{
          marginBlock: 50,
        }}
      >
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={5}
          selectedRangeStyle={{
            backgroundColor: "#000000",
          }}
          selectedDayTextStyle={{
            color: "#ffffff",
          }}
        />
      </View>

      <CustomButton
        title="Continue"
        handleSubmit={handleContinue}
        disabled={!startDate || !endDate}
      />
    </SafeAreaView>
  );
};

export default SelectDates;

const styles = StyleSheet.create({});
