import { Tabs } from "expo-router";
import React from "react";

const Tabslayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default Tabslayout;
