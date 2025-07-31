// components/SettingsDrawer.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

type SlideSide = "Left" | "Right" | "Up" | "Down";

type Props = {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
  slideSide: SlideSide;
};

const SettingsDrawer: React.FC<Props> = ({
  visible,
  onClose,
  onLogout,
  slideSide,
}) => {
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

        <TouchableOpacity onPress={onLogout} style={styles.option}>
          <Text style={styles.optionText}>Log Out</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose} style={styles.option}>
          <Text style={styles.optionText}>Cancel</Text>
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
