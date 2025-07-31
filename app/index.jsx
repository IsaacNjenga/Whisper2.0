import { Redirect } from "expo-router";
import React from "react";

const HomeScreen = () => {
  return <Redirect href={"/(auth)"} />;
};

export default HomeScreen;
