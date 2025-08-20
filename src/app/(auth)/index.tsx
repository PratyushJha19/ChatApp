import imagePath from "@/src/constants/imagePath";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, verticalScale } from "react-native-size-matters";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);

  let navigateToWelcome = () => {
    // Navigation logic to welcome screen can be added here
    router.push("/(auth)/terms_agree");
  };

  let loading_timeout = () => {
    setIsLoading(true);
    const nextScreenTimeout = setTimeout(navigateToWelcome, 2000); // Navigate to welcome after loading
    return () => clearTimeout(nextScreenTimeout); // Clear timeout on component unmount
  };

  useEffect(() => {
    const timeoutID = setTimeout(loading_timeout, 4000); // Simulate a loading time of 2 seconds

    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}></View>

      <View style={styles.body}>
        <Image source={imagePath.icon} style={styles.icon} />
        <Text style={styles.app_text}>ChatApp</Text>
      </View>

      <View style={styles.footer}>
        {isLoading ? (
          <>
            <ActivityIndicator size={moderateScale(30)} />
            <Text style={styles.loading_text}>Loading...</Text>
          </>
        ) : (
          <>
            <Text style={styles.made_by}>Made by</Text>
            <Text style={styles.pratzzzy}>PRATZZZY</Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(50),
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#171717ff",
  },
  header: {},
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: moderateScale(20),
  },
  icon: {
    width: moderateScale(150),
    height: moderateScale(150),
    resizeMode: "contain",
    borderRadius: moderateScale(75),
  },
  footer: {
    alignItems: "center",
    paddingBottom: verticalScale(20),
    height: verticalScale(60),
  },
  made_by: {
    fontSize: moderateScale(14),
    color: "#bbbbbbff",
    marginBottom: 5,
  },
  pratzzzy: {
    fontSize: moderateScale(18),
    color: "#ffffffff",
    fontWeight: "bold",
  },
  app_text: {
    fontSize: moderateScale(32),
    color: "#ffffffff",
    fontWeight: "bold",
  },
  loading_text: {
    fontSize: moderateScale(18),
    color: "#ffffffff",
    fontWeight: "bold",
    paddingTop: moderateScale(10),
  },
});

export default Auth;
