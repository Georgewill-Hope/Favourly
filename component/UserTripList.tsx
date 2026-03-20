import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { DocumentData } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import UserTripCard from "./UserTripCard";

const UserTripList = ({ userData }: { userData: DocumentData[] | [] }) => {
  const jsonedTrip = JSON.parse(userData[0].tripPlan);

  return (
    <View>
      <View>
        <FlatList
          data={userData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
          renderItem={({ item, index }) => (
            <UserTripCard data={item} key={index} />
          )}
          ListHeaderComponent={() => (
            <View className="bg-white w-full" style={{ paddingBottom: 10 }}>
              <Image
                source={{ uri: userData[0]?.tripData?.photo }}
                style={{ width: "100%", height: 240, marginTop: 10 }}
                resizeMode="cover"
                className="rounded-xl bg-orange-500"
              />
              <View style={{ marginTop: 10 }}>
                <Text
                  className="font-Outfit-Medium"
                  style={{
                    fontSize: 20,
                    letterSpacing: 1,
                  }}
                >
                  {userData[0]?.tripData?.name}
                </Text>
                <View
                  className="flex-row items-center justify-between"
                  style={{
                    marginTop: 5,
                    marginBottom: 15,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    className="font-Outfit-Regular text-gray-400"
                    style={{ fontSize: 17, color: "#9ca3af" }}
                  >
                    {moment(jsonedTrip.startDate).format("DD MMM YYYY")}
                  </Text>
                  <View className="flex-row items-center" style={{gap:7}}>
                    <FontAwesome6 name="bus" size={24} color="black" />
                    <Text
                      className="font-Outfit-Regular text-xl"
                      style={{ color: "#9ca3af" }}
                    >
                      {userData[0].tripData?.traveler?.title}
                    </Text>
                  </View>
                </View>
                <CustomButton
                  title="View Plan"
                  handleSubmit={() =>
                    router.push({
                      pathname: "/trip-details/[slug]",
                      params: { slug: userData[0]?.id },
                    })
                  }
                />
              </View>
            </View>
          )}
          stickyHeaderIndices={[0]}
        />
      </View>
    </View>
  );
};

export default UserTripList;
