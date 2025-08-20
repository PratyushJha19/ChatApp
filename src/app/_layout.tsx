import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();
const RootNavigation = () => {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 1000); // Adjust the timeout duration as needed
  }, []);

  const [isLogin, setIsLogin] = useState(false); // Replace with actual login state logic

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {isLogin ? <Redirect href={"/(main)"} /> : <Redirect href={"/(auth)"} />}
    </>
  );
};

export default RootNavigation;
