import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/src/context/authcontext";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";

// 1. Define your navigator param list
type RootStackParamList = {
  RequestChatRoom: { name: string; receiverId: string };
  // add other screens here...
};

// 2. Create a type for the current screen's route
type RequestChatRoomRouteProp = RouteProp<
  RootStackParamList,
  "RequestChatRoom"
>;

const RequestChatRoom = () => {
  const navigation = useNavigation();
  const route = useRoute<RequestChatRoomRouteProp>(); // ✅ typed route
  const [message, setMessage] = useState("");
  const { token, userId } = useAuth();

  const sendMessage = async () => {};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: { backgroundColor: "#171717" }, // dark background
      headerTintColor: "#fff", // makes the default back button (and icons) white
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="arrow-back-sharp" size={24} color="#fff" />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: "#0091ffff", fontSize: 16 }}>
              {route.params.name}
            </Text>
          </View>
        </View>
      ),
    });
  }, [navigation, route.params]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View
        style={{
          height: 1, // The thickness of the line
          backgroundColor: "rgba(255, 255, 255, 0.2)", // A light gray color
          //marginHorizontal: scale(5), // Optional: adds horizontal padding
          marginBottom: moderateScale(10),
        }}
      />

      <ScrollView></ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          borderTopWidth: 1,
          borderTopColor: "rgba(255,255,255,0.2)",
          backgroundColor: "#1e1e1e",
        }}
      >
        {/* Emoji Button */}
        <Entypo
          name="emoji-happy"
          color="white"
          size={28}
          style={{ marginRight: 10 }}
        />

        {/* Input Field */}
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Write your request message"
          placeholderTextColor="#aaa"
          style={{
            flex: 1,
            height: 40,
            paddingHorizontal: 12,
            borderRadius: 20,
            backgroundColor: "#fff",
            color: "black",
            fontSize: 16,
          }}
        />

        {/* Camera & Mic Icons */}
        <TouchableOpacity style={{ marginLeft: 10 }}>
          <Entypo name="camera" size={24} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={{ marginLeft: 10 }}>
          <Feather name="mic" size={24} color="#ccc" />
        </TouchableOpacity>

        {/* Send Button */}
        <Pressable
          onPress={sendMessage}
          style={{
            marginLeft: 10,
            backgroundColor: "#0091ffff", //#006652
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <Ionicons name="send-sharp" size={24} color="#fff" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1, // The thickness of the line
    backgroundColor: "rgba(255, 255, 255, 0.2)", // A light gray color
    //marginHorizontal: scale(5), // Optional: adds horizontal padding
  },
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
});

export default RequestChatRoom;
