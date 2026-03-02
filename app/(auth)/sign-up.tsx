import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const AnimatedView = Animated.createAnimatedComponent(View);

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const router = useRouter();

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(40);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 800 });
    translateY.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-orange-500 justify-center px-6"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <AnimatedView style={animatedStyle} className="p-6">
        <Text className="text-3xl text-center font-Outfit-Bold text-white mb-6">
          Create Account
        </Text>

        {/* Full Name */}
        <View className="mb-4">
          <Text className="text-white font-Outfit-Regular text-lg mb-2">
            Full Name
          </Text>
          <TextInput
            className="bg-white text-black text-xl p-4 rounded-xl font-Outfit-Regular"
            value={fullName}
            onChangeText={setFullName}
            placeholder="John Doe"
          />

          <Text className="text-red-800 font-Outfit-Regular mt-1 animate-bounce">
            Enter full name!
          </Text>
        </View>

        {/* Email */}
        <View className="mb-4">
          <Text className="text-white font-Outfit-Regular text-lg mb-2">
            Email
          </Text>
          <TextInput
            className="bg-white text-black text-xl p-4 rounded-xl font-Outfit-Regular"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            placeholder="Johndoe@gmail.com"
          />
          <Text className="text-red-800 font-Outfit-Regular mt-1 animate-bounce">
            Enter email!
          </Text>
        </View>

        {/* Password */}
        <View className="mb-4">
          <Text className="text-white font-Outfit-Regular text-lg mb-2">
            Password
          </Text>
          <View className="flex-row items-center bg-white rounded-xl px-3 font-Outfit-Regular text-black">
            <TextInput
              className="flex-1 py-4 text-xl"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
              <Text className="text-blue-500 font-semibold">
                {showPassword ? (
                  <Ionicons name="eye-off" size={24} color="black" />
                ) : (
                  <Ionicons name="eye" size={24} color="black" />
                )}
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-red-800 font-Outfit-Regular mt-1 animate-bounce">
            Enter email!
          </Text>
        </View>

        {/* Confirm Password */}
        <View className="mb-4">
          <Text className="text-white font-Outfit-Regular text-lg mb-2">
            Confirm Password
          </Text>
          <View className="flex-row items-center bg-white rounded-xl px-3 font-Outfit-Regular text-black">
            <TextInput
              className="flex-1  py-4 text-xl"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword((prev) => !prev)}
            >
              <Text className="text-blue-500 font-semibold">
                {showConfirmPassword ? (
                  <Ionicons name="eye-off" size={24} color="black" />
                ) : (
                  <Ionicons name="eye" size={24} color="black" />
                )}
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-red-800 font-Outfit-Regular mt-1 animate-bounce">
            Enter email!
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {}}
          className={`mt-4 p-4 rounded-xl items-center bg-slate-800`}
        >
          <Text className="text-white font-Outfit-Medium text-lg">
            Submit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-6 items-center"
          onPress={() => router.push("/sign-in")}
        >
          <Text className="font-Outfit-Regular text-lg">
            Already have an account? <Text className=" underline">Sign In</Text>
          </Text>
        </TouchableOpacity>
      </AnimatedView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
