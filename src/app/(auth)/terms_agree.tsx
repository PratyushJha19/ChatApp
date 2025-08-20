import ButtonComp from "@/src/components/atoms/ButtonComp";
import imagePath from "@/src/constants/imagePath";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const TermsAgree = () => {
  let onAgree = () => {
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.app_text}>Welcome to ChatApp</Text>

        <Image source={imagePath.welcome} style={styles.welcome_img} />

        <Text style={styles.policy_text}>
          Read my <Text style={styles.link_text}>Privacy Policy </Text>(None).
          Tap "Agree and Continue" to accept the{" "}
          <Text style={styles.link_text}>Terms of Services </Text>
          (It doesn't exist).
        </Text>

        <ButtonComp title="AGREE & CONTINUE" onPress={onAgree} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.made_by}>Made by</Text>
        <Text style={styles.pratzzzy}>PRATZZZY</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    // alignItems: "center",
    backgroundColor: "#171717ff",
    paddingVertical: verticalScale(84),
  },
  header: {
    alignItems: "center",
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
    color: "#0091ffff",
    fontWeight: "bold",
  },
  app_text: {
    fontSize: moderateScale(28),
    color: "#0091ffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  welcome_img: {
    width: moderateScale(250),
    height: moderateScale(250),
    resizeMode: "stretch",
    borderRadius: moderateScale(205), // Half of the width/height (250/2)
    alignSelf: "center",
    marginTop: verticalScale(30),
  },
  policy_text: {
    fontSize: moderateScale(14),
    color: "#bbbbbbff",
    marginTop: 20,
    textAlign: "center",
    paddingHorizontal: scale(40),
  },
  link_text: {
    color: "#0091ffff",
  },
});

export default TermsAgree;
