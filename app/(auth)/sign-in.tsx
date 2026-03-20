import CustomButton from "@/component/CustomButton";
import { useGlobalContext } from "@/context/GlobalContext";
import { getCurrentUser, login } from "@/lib/appwrite";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { setIsLoggedIn, setUser } = useGlobalContext();
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

  const handleSubmit = async () => {
    const validator =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Enter a valid Email and password!");
      return;
    }

    const validateEmail = validator.test(String(email).toLowerCase());

    if (!validateEmail) {
      Alert.alert("Erorr", "Invalid Email Address");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/(tabs)/trip");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
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
            onChangeText={(value) => setEmail(value)}
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
              onChangeText={(value) => setPassword(value)}
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
        </View>

        <CustomButton title="Login" handleSubmit={handleSubmit} />

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
