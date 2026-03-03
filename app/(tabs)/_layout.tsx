import { auth } from "@/config/FirebaseConfig";
import { Tabs, useRouter } from "expo-router";
import React from "react";

const Tabslayout = () => {
  const router = useRouter();
  auth.onAuthStateChanged((user) => {
    if (!user) router.replace("/sign-in");
  });

  return (
    <Tabs>
      <Tabs.Screen name="trip" options={{ headerShown: false }} />
      <Tabs.Screen name="discover" options={{ headerShown: false }} />
      <Tabs.Screen name="profile" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default Tabslayout;
