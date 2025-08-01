import { client } from "@/app/_layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

//const TOKEN_KEY = "my-stream-token";
export const API_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,
  allUsers: null,

  register: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const result = await fetch(`${API_URL}/api/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      const json = await result.json();

      console.log("Register response:", json);
      return { success: true };
    } catch (error) {
      console.error("Error during registration:", error);
      set({ isLoading: false });
      return {
        success: false,
        message: error.message || "Registration failed",
      };
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const result = await fetch(`${API_URL}/api/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await result.json();

      if (!result.ok) {
        console.error("Login failed:", json);
        return { success: false, message: json?.message || "Login failed" };
      }

      const user = {
        id: json.user._id,
        username: json.user.username,
        avatar: json.user.avatar,
        email: json.user.email,
        createdAt: json.user.createdAt,
      };

      await SecureStore.setItemAsync("token", json.stream_token);
      await SecureStore.setItemAsync("user", JSON.stringify(user));

      set({
        token: json.stream_token,
        user,
        isLoading: false,
        isCheckingAuth: false,
      });

      return { success: true };
    } catch (error) {
      console.error("Error during login:", error);
      set({ isLoading: false });
      return { success: false, message: error.message || "Login failed" };
    }
  },

  checkAuth: async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const userJson = await SecureStore.getItemAsync("user");
      const user = userJson ? JSON.parse(userJson) : null;

      set({ token, user, initialized: true });
    } catch (error) {
      console.error("Error checking auth:", error);
      return { success: false, message: error.message || "Auth check failed" };
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");
      await client.disconnectUser();
      set({ token: null, user: null });
      console.log("User logged out");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  },

  usersFetch: async () => {
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
      await AsyncStorage.setItem("users", JSON.stringify(data.users));

      set({ allUsers: data.users });
      return data.users;
    } catch (error) {
      console.error("Error during users fetch:", error);
    }
  },

  userFetch: async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/fetch-user?id=${id}`, {
        method: "GET",
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();

      return data.userDetails;
    } catch (error) {
      console.error("Error during user fetch:", error);
    }
  },

  loadUsersFromStorage: async () => {
    try {
      const stored = await AsyncStorage.getItem("users");
      if (stored) {
        set({ allUsers: JSON.parse(stored) });
      }
    } catch (error) {
      console.error("Error loading users from storage:", error);
    }
  },
}));
