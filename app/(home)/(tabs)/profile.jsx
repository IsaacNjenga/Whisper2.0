import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import bgImg from "@/assets/images/bg.jpeg";
import { BlurView } from "expo-blur";
import { Avatar, Button, TextInput, useTheme } from "react-native-paper";

const ProfileScreen = () => {
  const { colors } = useTheme();
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <ImageBackground source={bgImg} style={styles.image} resizeMode="cover">
          <BlurView
            intensity={90}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.avatar}>
            <Avatar.Image
              size={150}
              source={{
                uri: "https://pbs.twimg.com/media/Gw9vvoYbUAAty5q?format=jpg&name=360x360",
              }}
            />

            <Text style={{ fontWeight: "bold", marginTop: 10 }}>@John Doe</Text>

            <Button mode="elevated" style={{ marginTop: 10 }}>
              Change Image
            </Button>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.details}>
                <Text style={styles.label}>Username:</Text>{" "}
                <Text style={styles.value}>John Doe</Text>
              </View>

              <View style={styles.details}>
                <Text style={styles.label}>Email:</Text>{" "}
                <Text style={styles.value}>John@email.com</Text>
              </View>

              <View style={styles.details}>
                <Text style={styles.label}>Secondary email:</Text>{" "}
                <Text style={styles.value}>John.Doe@email.com</Text>
              </View>
            </View>

            <View style={styles.buttonView}>
              <Button mode="contained-tonal">Update Details</Button>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

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
  },
  formContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  avatar: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    marginVertical: 20,
    alignItems: "center",
    marginHorizontal: 30,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  buttonView: { marginTop: 20, alignItems: "center" },
  innerContainer: { paddingVertical: 10, backgroundColor: "rgba(0,0,0,0)" },
  label: {
    fontWeight: "800",
    color: "#555",
  },
  value: {
    color: "#222",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#444",
  },
});
