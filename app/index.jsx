import bgImg from "@/assets/images/bg.jpeg";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Spinner from "react-native-loading-spinner-overlay";
import { Button, TextInput, useTheme } from "react-native-paper";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

//Auth Screen
export default function Index() {
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const { onLogin, onRegister } = useAuth();

  const router = useRouter();

  const formRef = useRef(null);

  const onToggle = () => {
    if (formRef.current) {
      formRef.current.fadeOutDown(300).then(() => {
        setIsSignIn((prev) => !prev);
      });
    }
  };

  const onAuth = async () => {
    setLoading(true);
    try {
      if (isSignIn) {
        await onLogin(email, password);
      } else {
        await onRegister(username, email, password);
      }
    } catch (error) {
      console.log("Error on auth:", error);
      Alert.alert("Something went wrong", "Kindly refresh and try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground source={bgImg} style={styles.imageBackground}>
        <View style={styles.formContainer}>
          <Spinner visible={loading} />
          <Text style={styles.header}>Whisper</Text>

          <View style={styles.divider}>
            <View style={styles.dividerLine}></View>
            <Text style={styles.subHeader}>Connect. Anywhere. Anytime</Text>
            <View style={styles.dividerLine}></View>
          </View>
          <Animatable.View
            ref={formRef}
            animation="fadeInLeft"
            easing="ease-in-out"
            duration={200}
            key={isSignIn ? "signin" : "signup"}
          >
            {!isSignIn ? (
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
            ) : null}
          </Animatable.View>

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

          <View style={styles.formView}>
            <TextInput
              label="Password"
              autoCapitalize="none"
              autoComplete="none"
              mode="flat"
              value={password}
              secureTextEntry
              onChangeText={(password) => setPassword(password)}
              style={styles.inputStyle}
              left={<TextInput.Icon icon="lock" />}
              textColor={theme.colors.primary}
            />
          </View>

          <View>
            <Button
              mode="outlined"
              style={{ ...styles.submitButton, color: theme.colors.secondary }}
              onPress={onAuth}
            >
              <Text style={{ color: "#fff", fontSize: 20 }}>
                {isSignIn ? "Sign In" : "Sign Up"}
              </Text>
            </Button>

            <Button mode="text" onPress={onToggle}>
              {isSignIn
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </Button>
          </View>
          {/* form */}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: "center",
    backgroundColor: "#333",
    paddingHorizontal: WIDTH > HEIGHT ? "40%" : 0,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  formContainer: {
    margin: 18,
    backgroundColor: "rgba(238, 230, 230, 0.67)",
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "red",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  header: {
    marginTop: 10,
    fontSize: 49,
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 3,
    fontWeight: 800,
    lineHeight: 50,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 50,
    color: "white",
    marginHorizontal: 60,
  },
  subHeader: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 0,
    fontWeight: 500,
    color: "#333",
    lineHeight: 30,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
    padding: 5,
    borderRadius: 3,
  },
  dividerLine: { flex: 1, height: 2, backgroundColor: "#333" },
  formView: { marginBottom: 10 },
  submitButton: {
    marginVertical: 15,
    alignItems: "center",
    backgroundColor: "red",
    padding: 12,
    borderRadius: 50,
  },
  inputStyle: { backgroundColor: "white", borderRadius: 12 },
});
