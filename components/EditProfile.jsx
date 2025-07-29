import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button, Modal, Portal, TextInput, useTheme } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";

const EditProfile = ({ visible, onClose }) => {
  const theme = useTheme();

  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("john@email.com");
  const [loading, setLoading] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Spinner visible={loading} />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={onClose}
          contentContainerStyle={{ backgroundColor: "white", padding: 20 }}
          style={styles.modal}
        >
          <Text style={styles.header}>Update your profile</Text>
          <View style={styles.formContainer}>
            <View style={styles.formView}>
              <TextInput
                label="Username"
                autoCapitalize="none"
                mode="flat"
                autoComplete="none"
                value={username}
                onChangeText={(username) => setUsername(username)}
                style={styles.inputStyle}
                left={<TextInput.Icon icon="account" />}
                textColor={theme.colors.primary}
              />
            </View>
            <View style={styles.formView}>
              <TextInput
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                mode="flat"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputStyle}
                left={<TextInput.Icon icon="email" />}
                textColor={theme.colors.primary}
              />
            </View>
          </View>
          <View style={styles.buttonView}>
            <Button
              mode="contained-tonal"
              onPress={{}}
              style={{ marginTop: 10, backgroundColor: "green" }}
            >
              <Text style={{ fontSize: 18, color: "#fff" }}>Edit</Text>
            </Button>
            <Button
              mode="contained-tonal"
              onPress={onClose}
              style={{ marginTop: 10, backgroundColor: "red" }}
            >
              <Text style={{ fontSize: 18, color: "#fff" }}>Cancel</Text>
            </Button>
          </View>
        </Modal>
      </Portal>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  inputStyle: { backgroundColor: "white", borderRadius: 12 },
  formView: { marginBottom: 10 },
  formContainer: {
    margin: 5,
    backgroundColor: "rgba(238, 230, 230, 0.67)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  modal: { padding: 15, margin: 1 },
  header: {
    fontSize: 25,
    textAlign: "center",
    margin: 5,
    fontWeight: "bold",
    padding: 5,
    lineHeight: 30,
  },
  buttonView: { flexDirection: "row", justifyContent: "center", gap: 10 },
});
