import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";

const UserHeader = ({ channel }) => {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    const members = Object.values(channel?.state?.members || {});
    if (members.length < 2) return;

    const recipient = members.find(
      (m) => m.user.id !== channel?.client?.userID
    );
    if (!recipient?.user) return;

    navigation.setOptions({
      headerTitle: () => (
        <TouchableOpacity
          onPress={() => {
            handleUserProfileView(recipient.user.id);
          }}
        >
          <View style={styles.container}>
            {!recipient.user.image ? (
              <Avatar.Image size={38} source={{ uri: recipient.user.image }} />
            ) : (
              <Avatar.Text
                size={38}
                label={
                  recipient.user.name?.[0]?.toUpperCase() ||
                  recipient.user.email?.[0]?.toUpperCase() ||
                  "U"
                }
              />
            )}
            <Text style={styles.nameText}>
              {recipient.user.name || recipient.user.email || "Unknown"}
            </Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [channel, navigation]);

  const handleUserProfileView = (id) => {
    router.push(`/(home)/(profile)/${id}`);
  };

  return null; // Header is controlled via navigation options
};

export default UserHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    marginVertical: 12,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
});
