import React, { use, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useAuth } from "@/src/context/authcontext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

interface DecodedToken {
  userId: string;
}

const Header = () => {
  const { userId, setUserId, token, setToken } = useAuth();
  const [imgUrl, setImgUrl] = useState("");
  const [chats, setChats] = useState([]);
  const [requests, setRequests] = useState([]);

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

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = await AsyncStorage.getItem("authToken");

      if (storedToken) {
        const decodedToken = jwtDecode<DecodedToken>(storedToken);
        setUserId(decodedToken.userId);
        setToken(storedToken);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    getRequests();
  }, [userId]);

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  const getRequests = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.10:5000/getrequests/${userId}`
      );
      setRequests(response.data.requests);
    } catch (error) {
      console.log("Error fetching requests:", error);
    }
  };

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

  const acceptRequest = async (requestId: string) => {
    try {
      const response = await axios.post(
        "http://192.168.0.10:5000/acceptrequest",
        {
          userId: userId,
          requestId: requestId,
        }
      );
      if (response.status == 200) {
        Alert.alert("Success", "Request accepted successfully");
        getRequests();
      }
    } catch (error) {
      console.log("Error accepting request:", error);
    }
  };

  const getUser = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://192.168.0.10:5000/singleuser/${userId}`
      );
      setChats(response.data);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  // console.log(requests);
  // console.log(chats);

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
      <View style={styles.chatsSection}>
        <Text style={styles.middle_text}>Chats</Text>
        <View style={{ marginVertical: verticalScale(12) }}>
          {chats.length === 0 ? (
            <Text style={{ color: "gray", textAlign: "center", marginTop: 10 }}>
              No chats available
            </Text>
          ) : (
            chats.map((item: any, index: number) => (
              <Pressable
                key={index}
                style={styles.chatCard}
                onPress={() =>
                  router.push({
                    pathname: "/(main)/ChatRoom",
                    params: {
                      name: item.name,
                      receiverId: item._id,
                      image: item.image,
                    },
                  })
                }
              >
                <Image
                  source={{
                    uri:
                      item.image ||
                      "https://ui-avatars.com/api/?name=" + item.name,
                  }}
                  style={styles.chatImage}
                />
                <View style={styles.chatTextContainer}>
                  <Text style={styles.chatName}>{item.name}</Text>
                  <Text style={styles.chatLastMessage} numberOfLines={1}>
                    Tap to Chat
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#aaa"
                  style={{ marginLeft: 10 }}
                />
              </Pressable>
            ))
          )}
        </View>

        {/* The Separation Line */}
        <View style={styles.separator} />

        {/* 'Lower' Section */}
        <View style={styles.lowerSection}>
          <Text style={styles.lower_text}>Requests</Text>

          <View style={{ marginVertical: verticalScale(12) }}>
            {requests.length === 0 ? (
              <Text
                style={{ color: "gray", textAlign: "center", marginTop: 10 }}
              >
                No requests available
              </Text>
            ) : (
              requests.map((item: any, index: number) => (
                <View
                  key={index}
                  style={styles.requestCard}
                  // android_ripple={{ color: "#333" }}
                >
                  <Image
                    source={{
                      uri: item.from?.image,
                    }}
                    style={styles.requestImage}
                  />
                  <View style={styles.requestTextContainer}>
                    <Text style={styles.requestName}>{item.from?.name}</Text>
                    <Text style={styles.requestMessage} numberOfLines={1}>
                      {item.message}
                    </Text>
                  </View>
                  <Pressable onPress={() => acceptRequest(item.from._id)}>
                    <Ionicons
                      name="person-add-sharp"
                      color={"#007AFF"}
                      size={25}
                      style={{ marginRight: 10 }}
                    />
                  </Pressable>
                  <Pressable>
                    <Ionicons
                      name="trash-sharp"
                      color={"red"}
                      size={25}
                      style={{ marginRight: 10, marginLeft: 10 }}
                    />
                  </Pressable>
                </View>
              ))
            )}
          </View>
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
    marginTop: verticalScale(10),
  },
  lowerSection: {
    marginTop: verticalScale(10), // Add top margin for spacing
  },
  middle_text: {
    fontSize: moderateScale(15),
    fontWeight: "500",
    color: "#007AFF",
    paddingLeft: scale(10),
  },
  lower_text: {
    fontSize: moderateScale(15),
    fontWeight: "500",
    color: "#007AFF",
    paddingLeft: scale(10),
  },
  // New style for the separator line
  separator: {
    marginHorizontal: scale(7),
    height: 1, // The thickness of the line
    backgroundColor: "rgba(255, 255, 255, 0.2)", // A light gray color
    //marginHorizontal: scale(5), // Optional: adds horizontal padding
  },
  header_separator: {
    height: 1, // The thickness of the line
    backgroundColor: "rgba(255, 255, 255, 0.2)", // A light gray color
    marginHorizontal: scale(10), // Optional: adds horizontal padding
  },
  requestCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    padding: moderateScale(10),
    borderRadius: 12,
    marginBottom: verticalScale(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    paddingLeft: scale(10),
  },
  requestImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    marginRight: scale(12),
  },
  requestTextContainer: {
    flex: 1,
  },
  requestName: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  requestMessage: {
    fontSize: moderateScale(12),
    color: "#aaa",
  },
  chatCard: {
    marginHorizontal: scale(10),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    padding: moderateScale(10),
    borderRadius: 12,
    marginBottom: verticalScale(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  chatImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    marginRight: scale(12),
  },
  chatTextContainer: {
    flex: 1,
  },
  chatName: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  chatLastMessage: {
    fontSize: moderateScale(12),
    color: "#aaa",
  },
});

export default Header;
