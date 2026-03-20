import { askGemini, buildTravelPrompt } from "@/config/AiModel";
import { db } from "@/config/FirebaseConfig";
import { useGlobalContext } from "@/context/GlobalContext";
import { router } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GenerateTrip = () => {
  const { trip, user, setTrip } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GenerateAITrip();
  }, []);

  const GenerateAITrip = async () => {
    setLoading(true);
    try {
      const data =
        (trip &&
          buildTravelPrompt(
            trip?.name,
            trip?.totalNumberOfDays,
            trip.totalNumberOfDays - 1,
            trip?.budget,
            trip.traveler.people
          )) ||
        "";
      
      if (data === "" || data === null) {
        Alert.alert("Error", "Something went wrong! herer");
        return;
      }
      const result = await askGemini(data);

      const docId = Date.now().toString();

      await setDoc(doc(db, "UserTrips", docId), {
        userEmail: user.email,
        tripPlan: result,
        tripData: trip
          ? {
              ...trip,
              startDate: trip.startDate.toISOString(),
              endDate: trip.endDate.toISOString(),
            }
          : null,
      });

      setTrip(null);
      router.replace("/(tabs)/trip");
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView className="p-5 flex-1 bg-white items-center justify-center">
      <View>
        <Text className="font-Outfit-Medium text-3xl text-center mb-5">
          Please wait...
        </Text>
        <Text className="font-Outfit-Medium text-3xl text-center">
          Generating desired trip
        </Text>
        <Image
          source={require("@/assets/images/pendulum.gif")}
          width={100}
          height={300}
          resizeMode="contain"
        />
        <Text className="font-Outfit-Regular text-2xl text-gray-600 text-center">
          Let's be Patient
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default GenerateTrip;
