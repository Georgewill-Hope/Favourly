import StartNewTrip from "@/component/StartNewTrip";
import UserTripList from "@/component/UserTripList";
import { db } from "@/config/FirebaseConfig";
import { useGlobalContext } from "@/context/GlobalContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TripType = {
  userEmail: string;
  tripPlan: any;
  tripData: any;
};

const Trip = () => {
  const [trips, setTrips] = useState<DocumentData[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { user } = useGlobalContext();

  useEffect(() => {
    user && GetMyTrips();
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    setTrips([]);
    try {
      const q = query(
        collection(db, "UserTrips"),
        where("userEmail", "==", user.email)
      );

      const querySnapShot = await getDocs(q);

      if (querySnapShot.empty) {
        setTrips([]);
        return;
      }
      querySnapShot.forEach((doc) => {
        setTrips((prev) => [...prev, { id: doc.id, ...doc.data() }]);
      });
    } catch (error) {
      setTrips([]);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <View
        className="flex-row items-center justify-between w-full"
        style={{ justifyContent: "space-between" }}
      >
        <Text className="font-Outfit-Bold text-2xl tracking-wider">
          My Trips
        </Text>
        <Pressable onPress={() => router.push("/(tabs)/discover")}>
          <Ionicons name="add-circle" size={35} color="#f97316" />
        </Pressable>
      </View>
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : !loading && trips.length > 0 ? (
        <UserTripList userData={trips} />
      ) : (
        <StartNewTrip />
      )}

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Trip;
