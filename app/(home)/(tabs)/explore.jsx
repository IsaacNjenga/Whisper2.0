import bgImg from "@/assets/images/bg.jpeg";
import UserListView from "@/components/UserListView";
import { useAuth } from "@/providers/AuthProvider";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const API_URL = process.env.EXPO_PUBLIC_SERVER_URL;

const ExploreScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authState } = useAuth();

  const userId = authState?.user_id;

  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      if (authState.token === null) return;
      try {
        const res = await fetch(`${API_URL}/api/fetch-users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        const filteredUsers = data.users.filter((user) => user._id !== userId);

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, [userId, authState.token]);

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
