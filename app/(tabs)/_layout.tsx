import { useGlobalContext } from "@/context/GlobalContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Tabs } from "expo-router";
import React from "react";

const Tabslayout = () => {
  const { isLoggedIn, loading } = useGlobalContext();

  if (loading) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#f97316",
        tabBarLabelStyle: {
          fontFamily: "Outfit-Regular",
          fontSize: 13,
          letterSpacing: 1,
        },
        tabBarStyle: {
          height: 60,
          paddingTop: 3,
          borderColor: "#fff",
        },
      }}
    >
      <Tabs.Screen
        name="trip"
        options={{
          tabBarLabel: "Trip",

          tabBarIcon: ({ color }) => (
            <Ionicons name="location-sharp" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ color }) => (
            <Ionicons name="globe-sharp" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-circle-sharp" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Tabslayout;
