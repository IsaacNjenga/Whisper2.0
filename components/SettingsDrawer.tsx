// components/SettingsDrawer.tsx
import { useAuthStore } from "@/providers/AuthStore";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

type SlideSide = "Left" | "Right" | "Up" | "Down";

type Props = {
  visible: boolean;
  onClose: () => void;
  slideSide: SlideSide;
};

const SettingsDrawer: React.FC<Props> = ({ visible, onClose, slideSide }) => {
  const { logout } = useAuthStore();
  const router = useRouter();

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      animationIn={`slideIn${slideSide}`}
      animationOut={`slideOut${slideSide}`}
      style={styles.modal}
    >
      <View style={styles.drawer}>
        <Text style={styles.title}>Settings</Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            router.replace("/(home)/(profile)/profile" as any);
          }}
        >
          <Text style={styles.optionText}>My Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            logout();
            router.replace("/(auth)");
          }}
          style={styles.option}
        >
          <Text style={styles.optionText}>Log Out</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose} style={styles.option}>
          <Text style={styles.optionText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default SettingsDrawer;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  drawer: {
    width: "75%",
    height: "100%",
    backgroundColor: "#222",
    padding: 20,
    justifyContent: "flex-start",
  },
  title: {
    color: "white",
    fontSize: 22,
    marginBottom: 20,
  },
  option: {
    paddingVertical: 12,
  },
  optionText: {
    color: "white",
    fontSize: 16,
  },
});
