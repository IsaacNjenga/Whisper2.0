import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  MD3DarkTheme as DefaultTheme,
  MD2Colors,
  PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;
export const client = StreamChat.getInstance(STREAM_KEY);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#c52e2eff",
    secondary: "#ffffffff",
    background: MD2Colors.red600,
    onBackground: MD2Colors.white,
  },
};

const InitialLayout = ({ children }) => {
  const { authState, initialized } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === "(home)";

    if (!authState?.authenticated && inAuthGroup) {
      console.log("Not authenticated, navigating to auth");
      router.replace("/");
      return;
    }

    if (authState?.authenticated && !inAuthGroup) {
      console.log("Authenticated, navigating to home");
      router.replace("/(home)");
    }

    if (authState?.authenticated && authState?.token) {
      (async () => {
        if (!client.userID) {
          try {
            await client.connectUser(
              {
                id: authState.user_id,
                name: authState.user_name,
                image: authState.user_avatar,
              },
              authState.token
            );
            console.log("Stream user connected");
          } catch (error) {
            console.error("Stream connection failed:", error);
          }
        }
      })();
    }
  }, [initialized, authState, segments]);

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};

export default function RootLayout() {
  useEffect(() => {
    const run = async () => {
      if (Platform.OS === "android") {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);
      }
    };
    run();
  }, []);

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <InitialLayout>
              <Slot />
            </InitialLayout>
          </SafeAreaProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
