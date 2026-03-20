import CustomButton from "@/component/CustomButton";
import { useGlobalContext } from "@/context/GlobalContext";
import { SignOut } from "@/lib/appwrite";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const logout = async () => {
    setIsSubmitting(true);
    await SignOut();
    setUser(null);
    setIsLoggedIn(false);
    setIsSubmitting(false);

    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="p-5 pt-20">
      <View>
        <Image
          source={{ uri: user?.avatar }}
          style={{ width: 300, height: 300 }}
          className="rounded-full mx-auto"
        />
      </View>
      <View className="my-10">
        <Text className="font-Outfit-Bold text-2xl mb-2">
          Name: {user?.name}
        </Text>
        <Text className="font-Outfit-Bold text-2xl">Email: {user?.email}</Text>
      </View>

      <View>
        <CustomButton
          title="Logout"
          handleSubmit={logout}
          disabled={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
