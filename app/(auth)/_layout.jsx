import { useAuthStore } from "@/providers/AuthStore";
import { Redirect, Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  const { user, token } = useAuthStore();

  if (user && token) {
    return <Redirect href="/(home)" />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
