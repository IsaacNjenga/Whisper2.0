import bgImg from "@/assets/images/bg.jpeg";
import { useAuthStore } from "@/providers/AuthStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Avatar } from "react-native-paper";

const UserProfile = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { userFetch } = useAuthStore();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await userFetch(id);
        console.log(res);
        setUserData(res);
      } catch (error) {
        console.log("Error on user fetch", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "title here",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            router.replace("/");
            console.log("clicked");
          }}
          style={{ marginLeft: 10 }}
        >
          <MaterialIcons name="chevron-left" size={25} color={"white"} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Spinner visible={loading} textContent="Loading" />
      <View style={styles.container}>
        <ImageBackground source={bgImg} style={styles.image} resizeMode="cover">
          <BlurView
            intensity={90}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.avatar}>
            {userData?.avatar ? (
              <Avatar.Image
                size={150}
                source={{
                  uri: userData?.avatar,
                }}
              />
            ) : (
              <Avatar.Text
                size={150}
                label="JD"
                labelStyle={{
                  fontSize: 40,
                  fontWeight: "bold",
                  letterSpacing: 2,
                  lineHeight: 50,
                }}
              />
            )}

            <Text style={{ fontWeight: "bold", marginTop: 10, fontSize: 20 }}>
              @{userData?.username}
            </Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.details}>
                <Text style={styles.label}>Username:</Text>
                <Text style={styles.value}>{userData.username}</Text>
              </View>

              <View style={styles.details}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{userData?.email}</Text>
              </View>

              <View style={styles.details}>
                <Text style={styles.label}>Secondary email:</Text>
                <Text style={styles.value}>John.Doe@email.com</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default UserProfile;

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
