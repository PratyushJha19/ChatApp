import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function AuthTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#101010" }, // dark bar
        tabBarActiveTintColor: "#007AFF", // active color
      }}
    >
      {/* Login / Index Screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Chats",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-sharp" size={size} color={color} />
          ),
        }}
      />

      {/* Profile (or Signup) Screen */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-sharp" size={size} color={color} />
          ),
        }}
      />

      {/* Profile (or Signup) Screen */}
      <Tabs.Screen
        name="people"
        options={{
          title: "People",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-sharp" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="RequestChatRoom"
        options={{
          href: null, // this will hide the screen from the tab bar
          headerShown: true,
        }}
      />

      <Tabs.Screen
        name="ChatRoom"
        options={{
          href: null, // this will hide the screen from the tab bar
          headerShown: true,
        }}
      />
    </Tabs>
  );
}
