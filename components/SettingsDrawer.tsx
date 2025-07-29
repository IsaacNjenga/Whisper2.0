// components/SettingsDrawer.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

type Props = {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
};

const SettingsDrawer: React.FC<Props> = ({ visible, onClose, onLogout }) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      animationIn="slideInRight"
      animationOut="slideOutRight"
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
    justifyContent: "flex-end",
    alignItems: "flex-end",
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
