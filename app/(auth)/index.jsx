import bgImg from "@/assets/images/bg.jpeg";
import { useAuthStore } from "@/providers/AuthStore";
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
import { Button, HelperText, TextInput, useTheme } from "react-native-paper";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

//Auth Screen
export default function AuthScreen() {
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, register, logout, isCheckingAuth } = useAuthStore();
  const router = useRouter();

  const pswdError = () => {
    return password && password.length < 12;
  };

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
        const result = await login(email, password);
        if (!result.success) {
          console.log(result.message || {});
          setErrors(result.message || {});
        } else {
          console.log("Login successful");
          setEmail("");
          setPassword("");
          router.replace("/(home)");
        }
      } else {
        const result = await register(username, email, password);
        if (!result.success) {
          console.log(result.message || {});
          setErrors(result.message || {});
        } else {
          console.log("Registration successful");
          setEmail("");
          setPassword("");
          setUsername("");
          setIsSignIn(true);
        }
      }
    } catch (error) {
      console.log("Error on auth:", error);
      Alert.alert("Something went wrong", "Kindly refresh and try again");
    } finally {
      setLoading(false);
    }
  };

  if (isCheckingAuth) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      //behavior={Platform.OS === "ios" ? "padding" : "height"}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
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
                <HelperText
                  type="error"
                  visible={!!errors.username}
                  style={{ color: "#333", fontSize: 15 }}
                >
                  {errors.username || "Username is required"}
                </HelperText>
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
            <HelperText
              type="error"
              visible={!!errors.email}
              style={{ color: "#333", fontSize: 15 }}
            >
              {errors.email || "Email is required"}
            </HelperText>
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
            <HelperText
              type="error"
              visible={pswdError()}
              style={{ color: "#333", fontSize: 15 }}
            >
              Password must be at least 12 characters long.
            </HelperText>
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

            <Button onPress={logout}>
              <Text>Logout</Text>
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
