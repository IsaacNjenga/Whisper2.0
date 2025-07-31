import { useAuthStore } from "@/providers/AuthStore";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  MD3DarkTheme as DefaultTheme,
  MD2Colors,
  PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StreamChat } from "stream-chat";

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

export default function RootLayout() {
  const { checkAuth, user, token } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);
  const segments = useSegments();
  const router = useRouter();

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

  useEffect(() => {
    (async () => {
      await checkAuth();
      setAuthChecked(true);
    })();
  }, []);

  useEffect(() => {
    if (!authChecked || segments.length === 0) return;
    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;

    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)");
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/(home)");
    }
  }, [user, token, authChecked]);

  if (!authChecked) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <Slot />
        </SafeAreaProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
