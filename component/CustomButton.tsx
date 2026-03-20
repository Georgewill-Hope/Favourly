import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  title: string;
  handleSubmit(): void;
  disabled?: boolean;
}
const CustomButton = ({ handleSubmit, title, disabled }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handleSubmit}
      className={`w-full p-4 rounded-xl items-center bg-black ${disabled && "opacity-50"}`}
      disabled={disabled}
      style={{opacity:disabled ? 0.5 : 1}}
    >
      <Text className="text-white font-Outfit-Medium text-lg tracking-wider">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
