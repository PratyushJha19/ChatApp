import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image,
    };

    try {
      axios.post("http://192.168.0.10:5000/register", user);
      Alert.alert("Success", "User registered successfully, please login");
      setName("");
      setEmail("");
      setPassword("");
      setImage("");
      router.push("/(auth)/login");
    } catch (error) {
      console.log("Error registering user:", error);
      Alert.alert("Error", "Failed to register user");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#171717ff",
      }}
    >
      <View style={{ alignItems: "center", paddingHorizontal: scale(20) }}>
        <KeyboardAvoidingView>
          <View>
            <Text style={styles.header_text}>Setup your profile</Text>
            <Text
              style={{
                marginTop: verticalScale(10),
                color: "#bbbbbbff",
                textAlign: "center",
                fontSize: moderateScale(15),
                fontWeight: "500",
              }}
            >
              Profiles are visible to your friends, connection and groups.
            </Text>

            <Pressable>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  resizeMode: "cover",
                  alignSelf: "center",
                  marginTop: verticalScale(20),
                  marginBottom: verticalScale(-50),
                }}
                source={{
                  uri: image
                    ? image
                    : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
                }}
              ></Image>
            </Pressable>
            <Text
              style={{
                textAlign: "center",
                marginTop: verticalScale(60),
                color: "#bbbbbbff",
                fontSize: moderateScale(15),
                marginBottom: verticalScale(-65),
              }}
            >
              Add
            </Text>
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.email_text}>Name</Text>
              <View>
                <TextInput
                  value={name}
                  placeholder="Enter your name"
                  onChangeText={setName}
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

            <View>
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

            <View>
              <Text style={styles.email_text}>Image</Text>
              <View>
                <TextInput
                  value={image}
                  placeholder="Enter your image URL"
                  onChangeText={setImage}
                  placeholderTextColor={"#2c2c2cff"}
                  style={{
                    backgroundColor: "#ffffffff",
                    borderRadius: moderateScale(50),
                    paddingHorizontal: scale(20),
                    paddingVertical: verticalScale(8),
                    fontSize: moderateScale(15),
                  }}
                />
              </View>
            </View>

            <Pressable
              style={{
                marginTop: verticalScale(30),
                backgroundColor: "#0091ffff",
                padding: moderateScale(10),
                borderRadius: moderateScale(50),
                width: "50%",
                alignSelf: "center",
              }}
            >
              <Text
                onPress={handleRegister}
                style={{
                  textAlign: "center",
                  color: "#ffffffff",
                  fontSize: moderateScale(18),
                  fontWeight: "600",
                }}
              >
                Register
              </Text>
            </Pressable>

            <Pressable
              style={styles.login_button}
              onPress={() => {
                router.push("/(auth)/login");
              }}
            >
              <Text style={styles.signup_text}>
                Already have an account?{" "}
                <Text style={{ color: "#0091ffff" }}>Login</Text> instead
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
    marginTop: verticalScale(20),
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
    marginTop: verticalScale(12),
  },
  login_button: {
    marginTop: verticalScale(10),
    alignItems: "center",
  },
  signup_text: {
    color: "#bbbbbbff",
    fontSize: moderateScale(15),
  },
});

export default Signup;
