import { useAuthStore } from "@/providers/AuthStore";
import { useRouter } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

const LogoutPortal = ({ promptVisible, setPromptVisible }) => {
  const { logout } = useAuthStore();
  const router = useRouter();
  
  return (
    <Portal>
      <Dialog
        visible={promptVisible}
        onDismiss={() => setPromptVisible(false)}
        style={{
          backgroundColor: "#1e1e1e",
          borderRadius: 12,
          paddingBottom: 10,
          elevation: 5,
        }}
      >
        <Dialog.Title style={{ color: "white" }}>Log out?</Dialog.Title>
        <Dialog.Content>
          <Text
            variant="bodyMedium"
            style={{ color: "#ccc", fontSize: 15, marginBottom: 10 }}
          >
            Are you sure you want to log out of your account?
          </Text>
        </Dialog.Content>
        <Dialog.Actions
          style={{ justifyContent: "flex-end", paddingRight: 10 }}
        >
          <Button
            textColor="#f44336"
            onPress={async () => {
              setPromptVisible(false);
              await logout();
              router.replace("/(auth)");
            }}
          >
            Yes
          </Button>
          <Button
            textColor="#ccc"
            onPress={() => {
              setPromptVisible(false);
            }}
          >
            Cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default LogoutPortal;
