import { CardProps } from "@/types/types";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Card = ({ title, desc, icon, id, selectOption, onPress }: CardProps) => {
  return (
    <TouchableOpacity
      className="border bg-slate-200 items-center rounded-lg w-full flex-row justify-between"
      onPress={onPress}
      style={[
        {
          padding: 40,
          marginTop: 20,
          backgroundColor: "#e2e8f0",
        },
        selectOption === id && {
          borderColor: "#000",
          borderWidth: 1,
          borderStyle: "solid",
        },
      ]}
    >
      <View>
        <Text className="font-Outfit-Bold text-2xl tracking-wider">
          {title}
        </Text>
        <Text
          className="font-Outfit-Regular text-xl tracking-wider"
          style={{ color: "#9ca3af" }}
        >
          {desc}
        </Text>
      </View>
      <FontAwesome6 name={icon} size={24} color="black" />
    </TouchableOpacity>
  );
};

export default Card;
