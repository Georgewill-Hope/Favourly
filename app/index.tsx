import images from "@/constants/images";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <View className="h-[65vh] w-full">
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)", "#000"]}
          className="absolute top-0 bottom-0 left-0 right-0 z-10"
        />
        <Image
          source={images.tourist}
          resizeMode="cover"
          className="h-full w-full"
        />
      </View>
      <SafeAreaView className="flex-1 p-10">
        <Text className="text-orange-500 text-center font-Outfit-Bold text-5xl mb-5">
          Favourly
        </Text>

        <Text className="text-white text-center font-Outfit-Regular mb-10 tracking-widest">
          Discover new destinations effortlessly, get personalized itineraries
          in seconds, and explore the world with AI-powered insights that
          totally get your vibe.
        </Text>

        <Pressable
          className="bg-orange-500 items-center justify-center p-3 rounded-lg flex-row"
          onPress={() => router.push("/home")}
        >
          <Image
            source={images.google}
            resizeMode="cover"
            className="size-11"
          />
          <Text className="font-Outfit-Medium text-white text-lg tracking-wider">
            Continue with Google
          </Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
