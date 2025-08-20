import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const ButtonComp = ({ title, onPress }: any) => {
  return (
    <TouchableOpacity style={styles.button_container} onPress={onPress}>
      <Text style={styles.button_text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button_container: {
    backgroundColor: "#0091ffff",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    borderRadius: 50,
    marginTop: verticalScale(20),
    marginBottom: 90,
  },
  button_text: {
    fontSize: moderateScale(15),
    fontWeight: "500",
  },
});

export default ButtonComp;
