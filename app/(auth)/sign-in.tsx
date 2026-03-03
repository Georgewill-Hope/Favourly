import { auth } from "@/config/FirebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, useRouter } from "expo-router";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

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

  const handleSubmit = async() => {
    if (!email || !password) {
      setError("Enter a valid Email and password!");
      return;
    }

    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      if (user) {
        router.replace("/trip")
      }
      
    } catch (error:any) {
      const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === "auth/invalid-credential") {
          setError("Invalid Credentials");
        }
    }
  };

   
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-orange-500 justify-center px-6"
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : Platform.OS === "android"
            ? "padding"
            : undefined
      }
    >
      <AnimatedView style={animatedStyle} className="p-6">
        <Text className="text-3xl text-center font-Outfit-Bold text-white mb-6">
          Sign In
        </Text>

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
            onChangeText={(value) => {
              setEmail(value);
              setError("");
            }}
            placeholder="Johndoe@gmail.com"
          />
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
              onChangeText={(value) => {
                setPassword(value);
                setError("");
              }}
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
          {error && (
            <Text className="text-red-800 font-Outfit-Regular mt-1 animate-bounce">
              {error}
            </Text>
          )}
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          className={`mt-4 p-4 rounded-xl items-center bg-slate-800`}
        >
          <Text className="text-white font-Outfit-Medium text-lg">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-6 items-center"
          onPress={() => router.push("/sign-up")}
        >
          <Text className="font-Outfit-Regular text-lg">
            Don't have an account? <Text className=" underline"> Sign In</Text>
          </Text>
        </TouchableOpacity>
      </AnimatedView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
