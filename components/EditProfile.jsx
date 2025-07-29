import {  Text, } from "react-native";
import React from "react";
import { Button, Modal, Portal } from "react-native-paper";

const EditProfile = ({ visible, onClose }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={{ backgroundColor: "white", padding: 20 }}
      >
        <Text>Text here to show stuff</Text>{" "}
        <Button
          mode="contained-tonal"
          onPress={onClose}
          style={{ marginTop: 30 }}
        >
          <Text>Close</Text>
        </Button>
      </Modal>
    </Portal>
  );
};

export default EditProfile;
