import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/src/context/authcontext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { token, setToken, isLogin, setIsLogin } = useAuth();

  useEffect(() => {
    if (token) {
      router.replace("/(main)");
    }
  }, [token, router]);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios.post("http://192.168.0.10:5000/login", user).then((res) => {
      const token = res.data.token;
      AsyncStorage.setItem("authToken", token);
      setToken(token);
      console.log(res.data);
      setIsLogin(true);
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#171717ff",
      }}
    >
      <View style={{ padding: 10, alignItems: "center" }}>
        <KeyboardAvoidingView>
          <View>
            <Text style={styles.header_text}>Login to your account</Text>
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.email_text}>Email</Text>
              <View>
                <TextInput
                  value={email}
                  placeholder="Enter your email"
                  onChangeText={setEmail}
                  placeholderTextColor={"#2c2c2cff"}
                  style={{
                    backgroundColor: "#ffffffff",
                    borderRadius: moderateScale(50),
                    paddingHorizontal: scale(20),
                    paddingVertical: verticalScale(8),
                    fontSize: moderateScale(15),
                  }}
                ></TextInput>
              </View>
            </View>

            <View style={{ marginTop: verticalScale(20) }}>
              <Text style={styles.email_text}>Password</Text>
              <View>
                <TextInput
                  secureTextEntry={true}
                  value={password}
                  placeholder="Enter your password"
                  onChangeText={setPassword}
                  placeholderTextColor={"#2c2c2cff"}
                  style={{
                    backgroundColor: "#ffffffff",
                    borderRadius: moderateScale(50),
                    paddingHorizontal: scale(20),
                    paddingVertical: verticalScale(8),
                    fontSize: moderateScale(15),
                  }}
                ></TextInput>
              </View>
            </View>

            <Pressable
              style={{
                marginTop: verticalScale(50),
                backgroundColor: "#0091ffff",
                padding: moderateScale(10),
                borderRadius: moderateScale(50),
                width: "50%",
                alignSelf: "center",
              }}
            >
              <Text
                onPress={handleLogin}
                style={{
                  textAlign: "center",
                  color: "#ffffffff",
                  fontSize: moderateScale(18),
                  fontWeight: "600",
                }}
              >
                Login
              </Text>
            </Pressable>

            <Pressable
              style={styles.signup_button}
              onPress={() => {
                router.push("/(auth)/signup");
              }}
            >
              <Text style={styles.signup_text}>
                Dont have an account?{" "}
                <Text style={{ color: "#0091ffff" }}>Signup</Text> instead
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header_text: {
    fontSize: moderateScale(32),
    fontWeight: "bold",
    color: "#0091ffff",
    marginTop: verticalScale(80),
    textAlign: "center",
    justifyContent: "center",
  },
  form: {
    marginTop: verticalScale(50),
    // justifyContent: "center",
    // alignItems: "center",
  },
  email_text: {
    color: "#0091ffff",
    fontWeight: "600",
    paddingBottom: verticalScale(10),
    paddingHorizontal: scale(10),
    fontSize: moderateScale(18),
  },
  signup_button: {
    marginTop: verticalScale(10),
    alignItems: "center",
  },
  signup_text: {
    color: "#bbbbbbff",
    fontSize: moderateScale(15),
  },
});

export default Login;
