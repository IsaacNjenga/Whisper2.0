import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";

const ChannelStack = () => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="[cid]"
        options={{
          title: "",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.replace("/")}
              style={{ marginLeft: 10 }}
            >
              <MaterialIcons name="chevron-left" size={25} color={"white"} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default ChannelStack;
