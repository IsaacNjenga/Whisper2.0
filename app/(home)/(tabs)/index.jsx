import LogoutPortal from "@/components/LogoutPortal";
import SettingsDrawer from "@/components/SettingsDrawer";
import { useAuthStore } from "@/providers/AuthStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import { ChannelList } from "stream-chat-expo";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [promptVisible, setPromptVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { user,token } = useAuthStore();
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
      <ChannelList
        filters={{ type: "messaging", members: { $in: [userId] } }}
        onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
      />

      <SettingsDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        slideSide="Left"
      />

      <LogoutPortal
        setPromptVisible={setPromptVisible}
        promptVisible={promptVisible}
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
