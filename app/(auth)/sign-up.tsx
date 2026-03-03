import { auth } from "@/config/FirebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [fullNameError, setFullNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

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
    console.log(fullName, email, password, confirmPassword);
    if (!fullName) {
      setFullNameError("Enter full name!");
      return;
    }
    if (!email) {
      setEmailError("Enter a valid Email");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (newUser) {
        router.replace("/trip");
      }
    } catch (error:any) {
      Alert.alert(error.code)
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
            onChangeText={(value) => {
              setFullName(value);
              setFullNameError("");
            }}
            placeholder="John Doe"
          />

          {fullNameError && (
            <Text className="text-red-800 font-Outfit-Regular mt-1 animate-bounce">
              {fullNameError}
            </Text>
          )}
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
            onChangeText={(value) => {
              setEmail(value);
              setEmailError("");
            }}
            placeholder="Johndoe@gmail.com"
          />
          {emailError && (
            <Text className="text-red-800 font-Outfit-Regular mt-1 animate-bounce">
              {emailError}
            </Text>
          )}
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
                setPasswordError("");
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
              onChangeText={(value) => {
                setConfirmPassword(value);
                setPasswordError("");
              }}
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
          {passwordError && (
            <Text className="text-red-800 font-Outfit-Regular mt-1 animate-bounce">
              {passwordError}
            </Text>
          )}
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          className={`mt-4 p-4 rounded-xl items-center bg-slate-800`}
        >
          <Text className="text-white font-Outfit-Medium text-lg">Submit</Text>
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
