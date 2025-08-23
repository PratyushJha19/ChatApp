import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useAuth } from "@/src/context/authcontext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Header = () => {
  const { userId, setUserId, token, setToken } = useAuth();
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    axios
      .get(`http://192.168.0.10:5000/getphoto/${userId}`)
      .then((res) => {
        setImgUrl(res.data.image);
      })
      .catch((err) => {
        console.log(err);
        console.log("Error fetching image");
      });
  }, []);

  const logout = () => {
    try {
      setUserId("");
      AsyncStorage.removeItem("authToken");
      setToken("");
      router.replace("/(auth)/login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        {/* Left-aligned Image */}
        <Pressable onPress={logout}>
          <Image
            style={styles.image}
            source={{
              uri: imgUrl,
            }}
          />
        </Pressable>
        {/* Center-aligned Text */}
        {/* <Text style={styles.headerText}>Home</Text> */}
        {/* Right-aligned Profile Icon */}
        {/* <Pressable onPress={() => console.log("Profile pressed!")}>
          <Ionicons name="person-circle-outline" size={28} color="black" />
        </Pressable> */}
      </View>

      <View style={styles.header_separator} />

      {/* Main Content Area */}
      <View style={styles.contentArea}>
        {/* 'Chats' Section */}
        <View style={styles.chatsSection}>
          <Text style={styles.middle_text}>Chats</Text>
          <View></View>
        </View>

        {/* The Separation Line */}
        <View style={styles.separator} />

        {/* 'Lower' Section */}
        <View style={styles.lowerSection}>
          <Text style={styles.lower_text}>Requests</Text>
          <View></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    // backgroundColor: "#fff",
  },
  image: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
  },
  headerText: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: scale(10),
    paddingTop: verticalScale(10),
  },
  chatsSection: {
    marginBottom: verticalScale(10),
  },
  lowerSection: {
    marginTop: verticalScale(10), // Add top margin for spacing
  },
  middle_text: {
    fontSize: moderateScale(15),
    fontWeight: "500",
    color: "#007AFF",
  },
  lower_text: {
    fontSize: moderateScale(15),
    fontWeight: "500",
    color: "#007AFF",
  },
  // New style for the separator line
  separator: {
    height: 1, // The thickness of the line
    backgroundColor: "rgba(255, 255, 255, 0.2)", // A light gray color
    //marginHorizontal: scale(5), // Optional: adds horizontal padding
  },
  header_separator: {
    height: 1, // The thickness of the line
    backgroundColor: "rgba(255, 255, 255, 0.2)", // A light gray color
    marginHorizontal: scale(10), // Optional: adds horizontal padding
  },
});

export default Header;
