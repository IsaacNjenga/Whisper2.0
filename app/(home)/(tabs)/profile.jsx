import bgImg from "@/assets/images/bg.jpeg";
import EditProfile from "@/components/EditProfile";
import SettingsDrawer from "@/components/SettingsDrawer";
import { useAuth } from "@/providers/AuthProvider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import { useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button, useTheme } from "react-native-paper";

const ProfileScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { authState } = useAuth();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setDrawerVisible(true)}
          style={{ paddingRight: 10 }}
        >
          <MaterialIcons name="settings" size={28} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <ImageBackground
            source={bgImg}
            style={styles.image}
            resizeMode="cover"
          >
            <BlurView
              intensity={90}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.avatar}>
              <Avatar.Image
                size={150}
                source={{
                  uri:
                    authState?.user_avatar || "https://i.pravatar.cc/150?img=3",
                }}
              />

              <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20 }}>
                @John Doe
              </Text>

              <Button
                mode="contained-tonal"
                style={{ marginTop: 10 }}
                icon={"camera"}
              >
                <Text style={{ fontSize: 15, color: "#fff" }}>
                  Change Image
                </Text>
              </Button>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.innerContainer}>
                <View style={styles.details}>
                  <Text style={styles.label}>Username:</Text>{" "}
                  <Text style={styles.value}>John Doe</Text>
                </View>

                <View style={styles.details}>
                  <Text style={styles.label}>Email:</Text>{" "}
                  <Text style={styles.value}>John@email.com</Text>
                </View>

                <View style={styles.details}>
                  <Text style={styles.label}>Secondary email:</Text>{" "}
                  <Text style={styles.value}>John.Doe@email.com</Text>
                </View>
              </View>

              <View style={styles.buttonView}>
                <Button
                  mode="contained-tonal"
                  icon={"account-edit"}
                  onPress={() => setEditVisible(true)}
                >
                  <Text style={{ fontSize: 15, color: "#fff" }}>
                    Edit Profile
                  </Text>
                </Button>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>

      <EditProfile
        visible={editVisible}
        onClose={() => setEditVisible(false)}
      />

      <SettingsDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
      {/* */}
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: "center",
    backgroundColor: "#333",
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  formContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  avatar: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    marginVertical: 20,
    alignItems: "center",
    marginHorizontal: 30,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  buttonView: { marginTop: 20, alignItems: "center" },
  innerContainer: { paddingVertical: 10, backgroundColor: "rgba(0,0,0,0)" },
  label: {
    fontWeight: "800",
    color: "#555",
  },
  value: {
    color: "#222",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#444",
  },
});
