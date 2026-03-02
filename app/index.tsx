import images from "@/constants/images";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  Text,
  View,
  useWindowDimensions,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const { height, width } = useWindowDimensions();

  return (
    <View className="flex-1 bg-black">
      <View
        style={{
          height: height * 0.65,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)", "#000"]}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        />

        <Image
          source={images.tourist}
          resizeMode="cover"
          style={{
            width: "100%",
            height: Platform.OS === "web" ? height * 1.5 : "100%",
            position: "absolute",
            top: Platform.OS === "web" ? 0 : 0,
          }}
        />
      </View>

      <SafeAreaView className="flex-1 px-6 md:px-20 justify-center">
        <Text className="text-orange-500 text-center font-Outfit-Bold text-5xl mb-5">
          Favourly
        </Text>

        <Text className="text-white text-center font-Outfit-Regular mb-10 tracking-widest max-w-3xl mx-auto leading-7">
          Discover new destinations effortlessly, get personalized itineraries
          in seconds, and explore the world with AI-powered insights that
          totally get your vibe.
        </Text>

        <Pressable
          className="bg-orange-500 items-center justify-center p-4 rounded-lg w-full max-w-xl mx-auto"
          onPress={() => router.push("/sign-up")}
        >
          <Text className="font-Outfit-Medium text-white text-lg tracking-wider">
            Start
          </Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
