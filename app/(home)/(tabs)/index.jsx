import {
  View,
  ImageBackground,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import bgImg from "@/assets/images/bg.jpeg";
import { BlurView } from "expo-blur";
import { useNavigation } from "expo-router";
import {
  Avatar,
  Dialog,
  Portal,
  Tooltip,
  Text,
  Button,
} from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [promptVisible, setPromptVisible] = useState(false);

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
          <TouchableOpacity onPress={onLogout}>
            <Tooltip title="Log out">
              <MaterialIcons name="logout" size={24} color="white" />
            </Tooltip>
          </TouchableOpacity>
          <Portal>
            <Dialog
              visible={promptVisible}
              onDismiss={() => {
                setPromptVisible(false);
              }}
            >
              {" "}
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">This is simple dialog</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    setPromptVisible(false);
                  }}
                >
                  Done
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      ),
    });
  }, []);

  const onLogout = () => {
    console.log("clicked");
    setPromptVisible(true);
  };

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
