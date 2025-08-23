import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/authcontext";

SplashScreen.preventAutoHideAsync();

const NavigationContent = () => {
  const { token } = useAuth(); // ✅ safe now, already inside AuthProvider

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {token === null || token === "" ? (
        <Redirect href={"/(auth)"} />
      ) : (
        <Redirect href={"/(main)"} />
      )}
    </>
  );
};

const RootNavigation = () => {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 1000);
  }, []);

  return (
    <AuthProvider>
      <NavigationContent />
    </AuthProvider>
  );
};

export default RootNavigation;
