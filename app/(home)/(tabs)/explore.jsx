import { useAuth } from "@/providers/AuthProvider";
import React, { useEffect } from "react";
import { FlatList, ScrollView } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const API_URL = process.env.EXPO_PUBLIC_SERVER_URL;

const ExploreScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { authState } = useAuth();

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

        const filteredUsers = data.users.filter(
          (user) => user._id !== authState?.user._id
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, [authState?.user_id, authState.token]);

  return (
    <ScrollView>
      <Spinner visible={loading} textContent={"Loading users..."} />
      <FlatList
        data={users}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default ExploreScreen;
