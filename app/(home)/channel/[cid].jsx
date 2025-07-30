import { useHeaderHeight } from "@react-navigation/elements";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
} from "stream-chat-expo";

const ChannelScreen = () => {
  const [channel, setChannel] = useState(null);
  const { cid } = useLocalSearchParams();
  const { client } = useChatContext();

  const headerHeight = useHeaderHeight();
  useEffect(() => {
    const fetchChannel = async () => {
      const channels = await client.queryChannels({ cid: cid });
      setChannel(channels[0]);
    };
    fetchChannel();
  }, [cid]);

  if (!channel) {
    return (
      <View style={styles.loadingContainer}>
        <Spinner
          visible={true}
          textContent="Loading..."
          color="#fff"
          textStyle={{ color: "#fff" }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={headerHeight + 20}
        >
          <Channel channel={channel}>
            <View style={styles.chatWrapper}>
              <MessageList />
              <MessageInput />
            </View>
          </Channel>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ChannelScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0d0d0dff", // dark background for contrast
  },
  container: {
    flex: 1,
  },
  chatWrapper: {
    flex: 1,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    paddingBottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D0D0D",
  },
});
