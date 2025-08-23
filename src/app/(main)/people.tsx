import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/src/context/authcontext";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Users from "@/src/components/Users";
const People = () => {
  type User = {
    _id: string;
    name: string;
    email: string;
    image: string;
    friends: string[];
    // add whatever fields your API returns
  };

  const [users, setUsers] = useState<User[]>([]);
  const { userId, setUserId } = useAuth();

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://192.168.0.10:5000/users/${userId}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>People</Text> */}

      <View style={styles.header}>
        <Text style={styles.head_text}>People using this app</Text>
      </View>
      <View style={styles.separator} />
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }: { item: User }) => <Users item={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#171717ff",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    // backgroundColor: "#fff",
  },
  head_text: {
    color: "#0091ffff",
    fontSize: moderateScale(20),
    fontWeight: "bold",
  },
  separator: {
    height: 1, // The thickness of the line
    backgroundColor: "rgba(255, 255, 255, 0.2)", // A light gray color
    //marginHorizontal: scale(5), // Optional: adds horizontal padding
  },
});

export default People;
