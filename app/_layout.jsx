import { Stack, Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  MD3DarkTheme as DefaultTheme,
  MD2Colors,
  PaperProvider,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#f90404ff",
    secondary: "#ffffffff",
    background: MD2Colors.red500,
    onBackground: MD2Colors.white,
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
