import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Tabs } from "expo-router";
import { Button, useTheme } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const TabLayout = () => {
  const theme = useTheme();

  const tabLabelMap = {
    index: "Chats",
    profile: "Profile",
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.secondary,
        tabBarStyle: {
          height: 70,
          backgroundColor: "#333",
          borderTopWidth: 0,
        },
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              fontSize: 13,
              fontWeight: "600",
              color: focused ? "white" : "grey",
              textShadowColor: focused ? "#fff5" : "transparent",
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: focused ? 4 : 0,
              marginTop: 8,
            }}
          >
            {tabLabelMap[route.name]}
          </Text>
        ),
        tabBarIcon: ({ focused }) => {
          const iconMap = {
            index: "chat-bubble",
            profile: "person",
          };
          return (
            <MaterialIcons
              name={iconMap[route.name]}
              size={30}
              color={focused ? "white" : "grey"}
              style={{
                textShadowColor: focused ? "#fff5" : "transparent",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: focused ? 4 : 0,
              }}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Chats" }} />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerRight: () => (
            <TouchableOpacity style={{ padding: 10 }}>
              <MaterialIcons name="settings" size={30} color={"white"} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
