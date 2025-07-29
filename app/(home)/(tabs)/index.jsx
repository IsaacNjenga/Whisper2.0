import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import bgImg from "@/assets/images/bg.jpeg";
import { BlurView } from "expo-blur";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={bgImg} style={styles.image} resizeMode="cover">
        <BlurView intensity={90} tint="light" style={StyleSheet.absoluteFill} />
        <View>
          <Text>HomeScreen</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: "center",
    backgroundColor: "#333",
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backdropFilter: "blur(4) brightness(1.2)",
  },
});
