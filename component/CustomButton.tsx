import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  title: string;
  handleSubmit(): void;
}
const CustomButton = ({ handleSubmit, title }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handleSubmit}
      className={`w-full mt-4 p-4 rounded-xl items-center bg-slate-800`}
    >
      <Text className="text-white font-Outfit-Medium text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
