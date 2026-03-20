import { useGlobalContext } from "@/context/GlobalContext";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const Authlayout = () => {
   const { isLoggedIn, loading } = useGlobalContext();
  
    if (loading) {
      return null;
    }
  
    if (isLoggedIn) {
      return <Redirect href="/(tabs)/trip" />;
    }
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <StatusBar style="dark"/>
    </Stack>
  );
};

export default Authlayout;
