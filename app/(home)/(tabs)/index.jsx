import bgImg from "@/assets/images/bg.jpeg";
import SettingsDrawer from "@/components/SettingsDrawer";
import { useAuthStore } from "@/providers/AuthStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button, Dialog, Portal, Text } from "react-native-paper";
import { ChannelList } from "stream-chat-expo";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [promptVisible, setPromptVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { logout, user } = useAuthStore();
  const router = useRouter();

  const userId = user?.id;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ margin: 10 }}>
          {user?.avatar ? (
            <TouchableOpacity onPress={() => setDrawerVisible(true)}>
              <Avatar.Image
                size={40}
                source={{
                  uri: user?.avatar,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setDrawerVisible(true)}>
              <Avatar.Text
                size={40}
                label={user?.username[0].toUpperCase()}
                labelStyle={{ fontSize: 20 }}
              />
            </TouchableOpacity>
          )}
        </View>
      ),
      headerRight: () => (
        <View style={{ margin: 10 }}>
          <TouchableOpacity onPress={logoutPrompt}>
            <MaterialIcons name="logout" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const logoutPrompt = () => {
    setPromptVisible(true);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImg} style={styles.image} resizeMode="cover">
        <BlurView intensity={90} tint="dark" style={StyleSheet.absoluteFill} />
        <View>
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
                  onPress={async () => {
                    setPromptVisible(false);
                    await logout();
                    router.replace("/(auth)");
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
          <ChannelList
            filters={{ type: "messaging", members: { $in: [userId] } }}
            onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
          />
        </View>
      </ImageBackground>

      <SettingsDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        slideSide="Left"
      />
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
