import ChatProvider from "@/providers/ChatProvider";
import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "react-native-paper";

const HomeLayout = () => {
  const theme = useTheme();
  return (
    <ChatProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.secondary,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="channel" options={{ headerShown: false }} />
        <Stack.Screen name="(profile)" options={{ headerShown: false }} />
      </Stack>
    </ChatProvider>
  );
};

export default HomeLayout;
