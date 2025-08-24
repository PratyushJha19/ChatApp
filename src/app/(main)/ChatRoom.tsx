import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/src/context/authcontext";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import axios from "axios";
import { Alert } from "react-native";
import { formatTime } from "@/src/components/FormatTime";
import {
  useSocketContext,
  SocketContextProvider,
} from "@/src/context/socketContext";

type RootStackParamList = {
  ChatRoom: { name: string; receiverId: string };
  // add other screens here...
};

type ChatRoomRouteProp = RouteProp<RootStackParamList, "ChatRoom">;
type Message = {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt?: string;
  shouldShake?: boolean; // optional UI flag
};

const ChatRoom = () => {
  const navigation = useNavigation();
  const route = useRoute<ChatRoomRouteProp>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { token, userId } = useAuth();
  const { socket } = useSocketContext();

  const listenMessages = async () => {
    const { socket } = useSocketContext();
    useEffect(() => {
      socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true;
        setMessages([...messages, newMessage]);
      });

      return () => {
        socket?.off("newMessage");
      };
    }, [socket, messages, setMessages]);
  };

  listenMessages();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage: Message) => {
      newMessage.shouldShake = true;
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket]);

  const sendMessage = async (
    senderId: string,
    receiverId: string,
    message: string
  ) => {
    try {
      await axios.post("http://192.168.0.10:5000/sendmessage", {
        senderId,
        receiverId,
        message,
      });
      socket?.emit("sendMessage", { senderId, receiverId, message });
      setMessage("");
      setTimeout(() => {
        fetchMessages();
      }, 100);
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  const fetchMessages = () => {
    try {
      const senderId = userId;
      const receiverId = route.params.receiverId;
      const response = axios.get(`http://192.168.0.10:5000/messages/`, {
        params: {
          senderId,
          receiverId,
        },
      });
      response.then((res) => {
        setMessages(res.data);
      });
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

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

  console.log("messages", messages);

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

      <ScrollView
        contentContainerStyle={{ padding: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((item: Message, index: number) => {
          return (
            <View
              key={item._id || index}
              style={[
                styles.messageWrapper,
                item?.senderId?._id === userId
                  ? { alignItems: "flex-end" }
                  : { alignItems: "flex-start" },
              ]}
            >
              <View
                style={[
                  styles.messageContainer,
                  item?.senderId?._id === userId
                    ? { backgroundColor: "#0091ffff" }
                    : { backgroundColor: "#2c2c2c" },
                ]}
              >
                <Text style={styles.messageText}>{item.message}</Text>
                <Text style={styles.timeText}>
                  {formatTime(item?.timeStamp || "")}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

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
          placeholder="Write message"
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
          onPress={() => sendMessage(userId, route.params.receiverId, message)}
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
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  messageWrapper: {
    width: "100%",
    marginVertical: 4,
  },
  messageContainer: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 16,
  },
  sender: {
    backgroundColor: "#0091ff", // 🔵 blue bubble
    borderBottomRightRadius: 4,
  },
  receiver: {
    backgroundColor: "#2c2c2c", // ⚫ gray bubble
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    color: "#fff",
  },
  timeText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    marginTop: 4,
    alignSelf: "flex-end",
  },
});

export default ChatRoom;
