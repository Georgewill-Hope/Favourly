import { useGlobalContext } from "@/context/GlobalContext";
import { Redirect, Stack } from "expo-router";
import React from "react";

const Authlayout = () => {
  const { isLogged } = useGlobalContext();

  if (isLogged) {
    return <Redirect href="/trip" />;
  }

  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Authlayout;
