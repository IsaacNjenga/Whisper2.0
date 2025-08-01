import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { useTheme } from "react-native-paper";

const TabLayout = () => {
  const theme = useTheme();

  const tabLabelMap = {
    index: "Chats",
    explore: "Explore",
    //    profile: "Profile",
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
            explore: "groups",
            //profile: "person",
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
      <Tabs.Screen name="index" options={{ title: "" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      {/* <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.replace("/")}
              style={{ marginLeft: 10 }}
            >
              <MaterialIcons name="chevron-left" size={25} />
            </TouchableOpacity>
          ),
        }}
      /> */}
    </Tabs>
  );
};

export default TabLayout;
