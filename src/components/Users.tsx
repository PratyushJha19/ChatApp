import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useRouter } from "expo-router";

// import User type from People OR duplicate here if not exported
type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  friends: string[];
};

type UsersProps = {
  item: User;
};

const Users: React.FC<UsersProps> = ({ item }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>

      <Pressable
        style={styles.chat_button}
        onPress={() =>
          router.push({
            pathname: "/(main)/RequestChatRoom",
            params: {
              name: item.name,
              receiverId: item._id,
            },
          })
        }
      >
        <Text style={styles.chat_btn_text}>Chat</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    backgroundColor: "#171717", // same as app background
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    color: "#aaa",
    fontSize: 12,
  },
  chat_button: {
    alignItems: "flex-end",
    marginLeft: "auto",
    backgroundColor: "#0091ffff",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(6),
    borderRadius: 5,
  },
  chat_btn_text: {
    fontSize: moderateScale(14),
    fontWeight: "400",
  },
});

export default Users;
