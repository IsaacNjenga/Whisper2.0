import bgImg from "@/assets/images/bg.jpeg";
import { useAuth } from "@/providers/AuthProvider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import { useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button, Dialog, Portal, Text } from "react-native-paper";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [promptVisible, setPromptVisible] = useState(false);
  const { onLogout } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ margin: 10 }}>
          <Avatar.Image
            size={40}
            source={{
              uri: "https://pbs.twimg.com/media/Gw9vvoYbUAAty5q?format=jpg&name=360x360",
            }}
          />
        </View>
      ),
      headerRight: () => (
        <View style={{ margin: 10 }}>
          <TouchableOpacity onPress={logout}>
            <MaterialIcons name="logout" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const logout = () => {
    setPromptVisible(true);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImg} style={styles.image} resizeMode="cover">
        <BlurView intensity={90} tint="dark" style={StyleSheet.absoluteFill} />
        <View>
          <Text variant="bodyMedium">HomeScreen</Text>
          <Portal>
            <Dialog
              visible={promptVisible}
              onDismiss={() => setPromptVisible(false)}
              style={{
                backgroundColor: "#1e1e1e",
                borderRadius: 12,
                paddingBottom: 10,
                elevation: 5,
              }}
            >
              <Dialog.Title style={{ color: "white" }}>Log out?</Dialog.Title>
              <Dialog.Content>
                <Text
                  variant="bodyMedium"
                  style={{ color: "#ccc", fontSize: 15, marginBottom: 10 }}
                >
                  Are you sure you want to log out of your account?
                </Text>
              </Dialog.Content>
              <Dialog.Actions
                style={{ justifyContent: "flex-end", paddingRight: 10 }}
              >
                <Button
                  textColor="#f44336"
                  onPress={() => {
                    setPromptVisible(false);
                    onLogout();
                  }}
                >
                  Yes
                </Button>
                <Button
                  textColor="#ccc"
                  onPress={() => {
                    setPromptVisible(false);
                  }}
                >
                  Cancel
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
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
