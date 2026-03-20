import { router } from "expo-router";
import { DocumentData } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const UserTripCard = ({ data }: { data: DocumentData }) => {
  const formatData = (data: any) => {
    return JSON.parse(data);
  };


  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/trip-details/[slug]",
          params: { slug: data?.id },
        })
      }
      style={{ marginTop: 15 }}
      className="flex-row items-center gap-5"
    >
      <Image
        source={{
          uri: data.tripData.photo,
        }}
        resizeMode="cover"
        style={{ width: 100, height: 100 }}
        className="rounded-xl bg-orange-500"
      />
      <View>
        <Text
          className="font-Outfit-Bold text-xl tracking-wider"
          numberOfLines={2}
        >
          {data?.tripData?.name}
        </Text>
        <Text
          className="font-Outfit-Regular text-gray-400"
          style={{ fontSize: 17 }}
        >
          {moment(formatData(data.tripPlan).startDate).format("DD MMM YYYY")}
        </Text>
        <Text
          className="font-Outfit-Regular text-gray-400"
          style={{ fontSize: 17 }}
        >
          {data.tripData.traveler.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserTripCard;
