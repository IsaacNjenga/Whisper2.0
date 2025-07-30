import { client } from "@/app/_layout";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

const TOKEN_KEY = "my-stream-token";
export const API_URL = process.env.EXPO_PUBLIC_SERVER_URL;
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
    user_id: null,
  });
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const data = await SecureStore.getItemAsync(TOKEN_KEY);

      if (data) {
        const object = JSON.parse(data);

        setAuthState({
          token: object.token,
          authenticated: true,
          user_id: object.user._id,
          user_name: object.user.username,
          user_avatar: object.user.avatar,
          user_email: object.user.email,
          createdAt: object.user.createdAt,
        });
      }
      setInitialized(true);
    };
    loadToken();
  }, []);

  const register = async (username, email, password) => {
    console.log("Registering user:", { username, email, password });
    try {
      const result = await fetch(`${API_URL}/api/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });
      const json = await result.json();

      console.log("Registration response:", json);
      setAuthState({
        token: json.stream_token,
        authenticated: true,
        user_id: json.user._id,
        user_name: json.user.username,
        user_avatar: json.user.avatar,
        user_email: json.user.email,
        createdAt: json.user.createdAt,
      });

      await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(json));
      return result;
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: error.message || "Registration failed",
      };
    }
  };

  const login = async (email, password) => {
    try {
      const result = await fetch(`${API_URL}/api/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await result.json();

      setAuthState({
        token: json.stream_token,
        authenticated: true,
        user_id: json.user._id,
        user_name: json.user.username,
        user_avatar: json.user.avatar,
        user_email: json.user.email,
        createdAt: json.user.createdAt,
      });

      await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(json));
      return result;
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.message || "Login failed",
      };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await client.disconnectUser();
    setAuthState({
      token: null,
      authenticated: false,
      user_id: null,
      user_name: null,
      user_avatar: null,
      user_email: null,
      createdAt: null,
    });
    setInitialized(false);
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
    initialized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
