import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { fontPixel, heightPixel, widthPixel } from "../../utils/normalize";
import { COLORS } from "@/src/constants/theme";
import CustomButton from "@/src/components/CustomButton";
import { router } from "expo-router";

const OnboardingIndex = ({ navigation }: any): JSX.Element => {
  return (
    <SafeAreaView
      edges={["right", "left", "top"]}
      style={[styles.container, { backgroundColor: COLORS.interswitchBlue }]}
    >
      <Text
        style={[
          styles.secondaryText,
          {
            color: COLORS.white,
            fontSize: fontPixel(70),
            marginTop: heightPixel(20),
          },
        ]}
      >
        Track vehicles easily
      </Text>
      <Text
        style={[
          styles.secondaryText,
          {
            color: COLORS.white,
            fontSize: fontPixel(75),
            fontWeight: "700",
          },
        ]}
      >
        real-time
      </Text>
      <Text
        style={[
          styles.secondaryText,
          {
            color: COLORS.grey,
            fontSize: fontPixel(13.33),
            fontWeight: "300",
            width: widthPixel(250),
            marginTop: heightPixel(10),
          },
        ]}
      >
        Stay updated with live vehicle locations, notifications on delays, and
        the best routes to get you where you need to go.
      </Text>
      <CustomButton
        label="Get Started"
        onPress={() => {
          router.push("/(tabs)");
        }}
        buttonStyles={{
          marginTop: heightPixel(100),
          borderColor: COLORS.white,
          borderRadius: 30,
        }}
        textStyles={{ color: COLORS.white }}
        variant={"default"}
      />
    </SafeAreaView>
  );
};

export default OnboardingIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: heightPixel(25),
    paddingTop: heightPixel(40),
  },
  flexContainer: {
    flexDirection: "row",
  },
  noDisplay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
    height: 90,
  },
  primaryText: {
    fontSize: fontPixel(19),
    fontWeight: 600,
  },
  secondaryText: {
    fontSize: fontPixel(12),
  },
});
