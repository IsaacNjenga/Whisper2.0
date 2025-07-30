import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const ChannelStack = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="[cid]"
        options={{
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.replace('/')}
              style={{ marginLeft: 10 }}
            >
              <MaterialIcons name="chevron-left" size={20} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default ChannelStack;
