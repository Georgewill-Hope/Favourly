import { db, formatData } from "@/config/FirebaseConfig";
import { useGlobalContext } from "@/context/GlobalContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const TripDetails = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [trip, setTrip] = useState<DocumentData[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useGlobalContext();

  useEffect(() => {
    if (user && slug) {
      GetMyTrips(slug);
    }
  }, [user, slug]);

  const getCityImage = async (city: string) => {
    const apiKey = process.env.EXPO_PUBLIC_UNSPLASH;

    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKey}`
    );

    const data = await res.json();
    return data.results[0].urls.regular;
  };

  const GetMyTrips = async (id: string) => {
    setLoading(true);
    setTrip([]);

    try {
      const docRef = doc(db, "UserTrips", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setTrip([]);
        return;
      }

      setTrip([{ id: docSnap.id, ...docSnap.data() }]);
    } catch (error) {
      setTrip([]);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const data = formatData(trip[0]?.tripPlan);


  return (
    <ScrollView style={{ flex: 1, width: "100%" }}>
      <View className="flex-1 w-full">
        <Image
          source={{
            uri: trip[0]?.tripData.photo,
          }}
          resizeMode="cover"
          style={{ width: "100%", height: 350 }}
          className=" bg-orange-500"
        />

        <View className="p-5 rounded-2xl flex-1 -mt-5 bg-white">
          <Text className="font-Outfit-Bold text-3xl tracking-wider">
            {data?.trip_summary.location}
          </Text>
          <Text className="font-Outfit-Regular text-xl tracking-wider mb-3">
            {moment(trip[0]?.tripData.startDate).format("DD MMM YYYY") +
              "  to  " +
              moment(trip[0]?.tripData.endtDate).format("DD MMM YYYY")}
          </Text>
          <View className="flex-row items-center" style={{ gap: 7 }}>
            <FontAwesome6 name="bus" size={24} color="skyblue" />
            <Text
              className="font-Outfit-Regular text-xl"
              style={{ color: "#9ca3af" }}
            >
              {trip[0]?.tripData?.traveler?.title}
            </Text>
          </View>

          {/* flight options */}
          <View>
            <View className="flex-row justify-between items-center mt-7">
              <View className="flex-row gap-5">
                <FontAwesome6 name="plane-departure" size={25} color="black" />
                <Text className="font-Outfit-Bold text-xl tracking-wider">
                  Flight
                </Text>
              </View>
              {data?.flight_information && (
                <Link
                  href={data?.flight_information.booking_url}
                  target="_blank"
                  className="font-Outfit-Bold bg-black text-white py-3 px-5 tracking-wide rounded-lg text-center"
                >
                  Book Here
                </Link>
              )}
            </View>

            <Text className="font-Outfit-Regular text-xl">
              Airline: {"  "}{" "}
              {data?.flight_information.flight_options[0]?.airline}
            </Text>
            <Text className="font-Outfit-Regular text-xl">
              Price Per Person:{"  "}
              {data?.flight_information.flight_options[0]?.price_per_person}
            </Text>
          </View>

          <View className="mt-10">
            <View className="bg-white w-full">
              <Text className="font-Outfit-Bold text-2xl mb-2">
                Hotel Recomendation
              </Text>
            </View>

            <FlatList
              data={data?.hotel_options}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.hotel_name}
              renderItem={({ item }) => (
                <View
                  style={{
                    width: 300,
                    marginRight: 20,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      height: 200,
                      borderRadius: 10,
                      position: "relative",
                    }}
                  >
                    <Image
                      source={{ uri: item.image_url }}
                      style={{ width: "100%", height: 200 }}
                      className="rounded-2xl absolute z-10"
                    />
                    <View className="absolute top-0 bottom-0 right-0 left-0 bg-black rounded-2xl items-center justify-center">
                      <Text className="font-Outfit-Bold text-white text-3xl tracking-wider">
                        No image
                      </Text>
                    </View>
                  </View>

                  <View style={{ paddingHorizontal: 10 }}>
                    <Text
                      className="font-Outfit-Bold tracking-wide text-lg"
                      style={{ marginVertical: 10 }}
                    >
                      {item.hotel_name}
                    </Text>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-2">
                        <AntDesign name="star" size={24} color="gold" />
                        <Text className="font-Outfit-Medium">
                          {item.rating}
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-2">
                        <FontAwesome5 name="hotel" size={24} color="gold" />
                        <Text className="font-Outfit-Medium">
                          {item.price_per_night_approx} / Night
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
          {/* itinerary */}

          <View className="mt-14">
            <View className="flex-row items-center gap-5">
              <Text className="font-Outfit-Bold text-2xl">Plan Details</Text>
              <FontAwesome5 name="tripadvisor" size={24} color="red" />
            </View>
            {data?.itinerary?.map((item: any, i: number) => (
              <View key={i} style={{ width: "100%", marginTop: 20 }}>
                <Text className="font-Outfit-Bold text-2xl mb-5">
                  Day {item?.day}
                </Text>

                {item?.activities?.map((act: any, i: number) => (
                  <View
                    key={i}
                    style={{ marginBottom: 20, borderRadius: 10 }}
                    className="bg-gray-100"
                  >
                    <View
                      style={{
                        width: "100%",
                        height: 200,
                        borderRadius: 10,
                        position: "relative",
                      }}
                    >
                      <Image
                        source={{ uri: act?.image_url }}
                        style={{ height: 200, width: "100%", borderRadius: 10 }}
                        className="absolute z-10"
                      />
                      <View className="absolute top-0 bottom-0 right-0 left-0 bg-black rounded-2xl items-center justify-center">
                        <Text className="font-Outfit-Bold text-white text-3xl tracking-wider">
                          No Image
                        </Text>
                      </View>
                    </View>

                    <View className="my-5 px-5 flex-row justify-between items-center">
                      <View className="" style={{ flex: 9 }}>
                        <Text className="font-Outfit-Bold text-xl">
                          {act.place_name}
                        </Text>
                        <Text className="font-Outfit-Medium text-lg">
                          {act.details}
                        </Text>

                        <View>
                          <View className="flex-row items-center gap-2">
                            <FontAwesome6 name="ticket" size={24} color="red" />
                            <Text className="font-Outfit-Regular text-lg">
                              Ticket Price:{" "}
                              <Text className="font-Outfit-Bold">
                                {" "}
                                {act.ticket_pricing}
                              </Text>
                            </Text>
                          </View>
                          <Text className="font-Outfit-Regular text-lg">
                            Best time to visit:{" "}
                            <Text className="font-Outfit-Bold">
                              {" "}
                              {act.best_time_to_visit}
                            </Text>
                          </Text>
                          <Text className="font-Outfit-Regular text-lg">
                            Duration:{" "}
                            <Text className="font-Outfit-Bold">
                              {" "}
                              {act.recommended_duration}
                            </Text>
                          </Text>
                        </View>
                      </View>

                      <Feather
                        name="external-link"
                        size={24}
                        color="black"
                        style={{ flex: 1 }}
                      />
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
        <StatusBar style="light" />
      </View>
    </ScrollView>
  );
};

export default TripDetails;

const styles = StyleSheet.create({});
