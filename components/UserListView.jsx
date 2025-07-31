import { useAuthStore } from "@/providers/AuthStore";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, TouchableRipple } from "react-native-paper";
import { useChatContext } from "stream-chat-expo";

const UserListView = ({ item }) => {
  const { client } = useChatContext();
  const router = useRouter();

  const { user } = useAuthStore();

  const onPress = async () => {
    const members = [user?.id, item._id].sort();

    const channel = client.channel("messaging", {
      members,
    });

    await channel.watch();
    router.replace(`/(home)/channel/${channel.cid}`);
  };

  return (
    <View style={styles.container}>
      <TouchableRipple
        onPress={onPress}
        rippleColor="rgba(78, 71, 71, 0.1)"
        borderless={false}
        style={styles.item}
      >
        <View style={styles.innerItem}>
          {item.avatar ? (
            <Avatar.Image size={50} source={{ uri: item.avatar }} />
          ) : (
            <Avatar.Text size={50} label={item.username[0].toUpperCase()} />
          )}

          <View style={styles.textWrapper}>
            <Text style={styles.username}>{item.username}</Text>
            {item.email && (
              <Text style={styles.email} numberOfLines={1}>
                {item.email}
              </Text>
            )}
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default UserListView;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 3,
  },
  item: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#1a1919ff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  innerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  textWrapper: {
    marginLeft: 12,
    flex: 1,
  },
  username: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
  },
  email: {
    fontSize: 13,
    color: "#aaa",
    marginTop: 2,
  },
});
