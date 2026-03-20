import CustomButton from "@/component/CustomButton";
import { useGlobalContext } from "@/context/GlobalContext";
import { Register, SignOut } from "@/lib/appwrite";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
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
  const [name, setName] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const logout = async () => {
    await SignOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/");
  };

  const handleSubmit = async () => {
    const validator =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validateEmail = validator.test(String(emailAddress).toLowerCase());
    if (password !== confirmPassword) {
      Alert.alert("Erorr", "Passwords do not match!");
      return;
    }

    if (!validateEmail) {
      Alert.alert("Erorr", "Invalid Email Address");
      return;
    }

    setIsSubmitting(true);
    try {
      const newClient = await Register(emailAddress, password, name);

      if (newClient) router.push("/(tabs)/trip");
    } catch (error: any) {
      Alert.alert("Erorr", error.message);
      throw error;
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
          Create Account
        </Text>

        {/* Name */}
        <View className="mb-4">
          <Text className="text-white font-Outfit-Regular text-lg mb-2">
            Full Name
          </Text>
          <TextInput
            className="bg-white text-black text-xl p-4 rounded-xl font-Outfit-Regular"
            value={name}
            onChangeText={(value) => setName(value)}
            placeholder="John Doe"
          />
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
            value={emailAddress}
            onChangeText={(value) => {
              setEmailAddress(value);
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
              onChangeText={(value) => setConfirmPassword(value)}
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
        </View>

        <CustomButton title="Sign up" handleSubmit={handleSubmit} disabled={isSubmitting} />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  title: {
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#000000",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  secondaryButtonText: {
    color: "#0a7ea4",
    fontWeight: "600",
  },
  linkContainer: {
    flexDirection: "row",
    gap: 4,
    marginTop: 12,
    alignItems: "center",
  },
  error: {
    color: "#d32f2f",
    fontSize: 12,
    marginTop: -8,
  },
  debug: {
    fontSize: 10,
    opacity: 0.5,
    marginTop: 8,
  },
});
