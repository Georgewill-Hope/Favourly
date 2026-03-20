import CustomButton from "@/component/CustomButton";
import { useGlobalContext } from "@/context/GlobalContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import moment from "moment";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ReviewTripCardProps {
  title: string;
  desc: string;
  icon: string;
}

const ReviewTripCard = ({ title, desc, icon }: ReviewTripCardProps) => {
  return (
    <View
      style={{
        paddingBlock: 30,
        paddingInline: 20,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "100%",
      }}
      className="rounded-xl"
    >
      <FontAwesome6 name={icon} size={24} color="black" />
      <View style={{ width: "90%" }}>
        <Text
          className="font-Outfit-Bold text-2xl tracking-wider"
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          className="font-Outfit-Regular text-xl tracking-wider"
          style={{ color: "#9ca3af" }}
        >
          {desc}
        </Text>
      </View>
    </View>
  );
};

const ReviewTrip = () => {
  const { trip } = useGlobalContext();
  return (
    <SafeAreaView className="p-5 flex-1 bg-white">
      <View className="flex-row items-center gap-5 mb-7">
        <Pressable
          className="bg-black w-fit p-3 rounded-full"
          onPress={() => router.back()}
        >
          <MaterialIcons name="keyboard-backspace" size={22} color="white" />
        </Pressable>

        <Text className="font-Outfit-Regular text-lg">back</Text>
      </View>
      <View className="space-y-5">
        <Text className="font-Outfit-Bold text-4xl">Review your trip</Text>
        <Text className="font-Outfit-Regular text-lg tracking-wider">
          Before generating your trip, please review your choices
        </Text>
      </View>
      <View>
        <ReviewTripCard
          title="Destination"
          desc={trip?.name ?? ""}
          icon="location-crosshairs"
        />
        <ReviewTripCard
          title="Travel Date"
          desc={
            moment(trip?.startDate).format("DD MMM") +
            " To " +
            moment(trip?.endDate).format("DD MMM") +
            `(${trip?.totalNumberOfDays} days)`
          }
          icon="calendar-days"
        />
        <ReviewTripCard
          title="Who is traveling"
          desc={trip?.traveler.title ?? ""}
          icon="bus"
        />
        <ReviewTripCard
          title="Budget"
          desc={trip?.budget ?? ""}
          icon="money-check-dollar"
        />

        <View style={{ marginTop: 30 }}>
          <CustomButton
            title="Build Trip"
            handleSubmit={() => router.replace("/(create)/generate-trip")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReviewTrip;

const styles = StyleSheet.create({});
