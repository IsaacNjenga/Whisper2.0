import UserHeader from "@/components/UserHeader";
import { useAuthStore } from "@/providers/AuthStore";
import { useHeaderHeight } from "@react-navigation/elements";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
} from "stream-chat-expo";

// const UserHeader = ({ channel }) => {
//   const navigation = useNavigation();
//   const { user } = useAuthStore();

//   useEffect(() => {
//     if (channel && channel.state && channel.state.members) {
//       const members = Object.values(channel?.state?.members || {});

//       if (!members.length) return;

//       const recipient = members.find((m) => m.user.id !== user.id);

//       if (recipient) {
//         navigation.setOptions({
//           headerTitle: () => (
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               {recipient.user.image ? (
//                 <Avatar.Image
//                   size={40}
//                   source={{ uri: recipient.user.image }}
//                 />
//               ) : (
//                 <Avatar.Text
//                   size={40}
//                   label={recipient.user.name?.[0].toUpperCase() || "U"}
//                 />
//               )}
//               <Text style={{ marginLeft: 10, fontWeight: "bold", fontSize: 25,color:'white' }}>
//                 {recipient.user.name || recipient.user.email}
//               </Text>
//             </View>
//           ),
//         });
//       }
//     }
//   }, [channel, navigation, user]);
// };

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
            <UserHeader channel={channel} />
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
