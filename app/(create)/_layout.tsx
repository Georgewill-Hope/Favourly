import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const Createlayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="search-place" />
      <Stack.Screen name="select-traveler" />
      <Stack.Screen name="select-budget" />
      <Stack.Screen name="select-dates" />
      <Stack.Screen name="review-trip" />
      <Stack.Screen name="generate-trip" />
      <StatusBar style="dark" />
    </Stack>
  );
};

export default Createlayout;
