import bgImg from "@/assets/images/bg.jpeg";
import UserListView from "@/components/UserListView";
import { useAuthStore } from "@/providers/AuthStore";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const ExploreScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, allUsers, usersFetch, loadUsersFromStorage } = useAuthStore();

  const userId = user?.id;

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        if (!allUsers) {
          const fetchedUsers = await usersFetch();
          if (fetchedUsers) {
            const filtered = fetchedUsers.filter((user) => user._id !== userId);
            setUsers(filtered);
          }
        } else {
          await loadUsersFromStorage();
          const filtered = allUsers.filter((user) => user._id !== userId);
          setUsers(filtered);
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [userId]);

  return (
    <>
      <ImageBackground source={bgImg} style={styles.image} resizeMode="cover">
        <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFill} />
        <Spinner
          visible={loading}
          textContent={"Loading users..."}
          textStyle={{ color: "white" }}
        />
        <FlatList
          data={users}
          contentContainerStyle={{
            gap: 3,
            backgroundColor: "rgba(220, 188, 188, 0)",
            marginTop:3
          }}
          renderItem={({ item }) => <UserListView item={item} />}
        />
      </ImageBackground>
    </>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backdropFilter: "blur(4) brightness(1.2)",
  },
});
