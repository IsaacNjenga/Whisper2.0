import { useEffect, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useAuthStore } from "./AuthStore";

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;
export const client = StreamChat.getInstance(STREAM_KEY);

const ChatProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const { user, token } = useAuthStore();
  const isSignedIn = user && token;

  useEffect(() => {
    if (!isSignedIn) {
      console.log("Not signed in — skipping Stream connect.");
      return;
    }

    if (!token) {
      console.log("No token found.");
      return;
    }

    if (!user) {
      console.log("No user found.");
      return;
    }

    const connect = async () => {
      try {
        await client.connectUser(
          { id: user.id, name: user.username, image: user.avatar },
          token
        );
        console.log("Stream connected");
        setIsReady(true);
      } catch (error) {
        console.error("Error connecting to Stream:", error);
        return;
      }
    };

    connect();

    return () => {
      client.disconnectUser();
      setIsReady(false);
    };
  }, [user, token]);

  if (!isReady) {
    return (
      // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      //   <ActivityIndicator size="large" color={theme.colors.primary} />{" "}
      //   <Text
      //     style={{
      //       marginTop: 10,
      //       fontSize: 18,
      //       color: "#333",
      //     }}
      //   >
      //     Setting you up...
      //   </Text>
      //   <Button onPress={logout}>
      //     <Text>Logout</Text>
      //   </Button>
      // </View>
      <Spinner textContent="Setting you up..." />
    );
  }

  return (
    <>
      <OverlayProvider>
        <Chat client={client}>{children}</Chat>
      </OverlayProvider>
    </>
  );
};

export default ChatProvider;
