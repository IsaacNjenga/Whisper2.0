import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Button } from "react-native-paper";

const API_URL = process.env.EXPO_PUBLIC_SERVER_URL;

const AvatarUpload = ({ id }) => {
  const [loading, setLoading] = useState(false);

  const uploadAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera roll is required!");
      setLoading(false);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
      base64: true, // sending data as uri
      exif: false, // exclude EXIF data
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      console.log("User cancelled image picker.");
      return;
    }

    if (!result.canceled && result.assets.length > 0) {
      setLoading(true);

      try {
        const imageBase64 = result.assets[0].base64;
        const dataUri = `data:image/jpeg;base64,${imageBase64}`;

        const res = await fetch(`${API_URL}/api/update-avatar?id=${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: dataUri }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Response data:", data);
      } catch (error) {
        console.error("Error uploading avatar:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteAvatar = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/delete-avatar?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error deleting avatar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Spinner visible={loading} textContent={"Loading..."} />
      <View
        style={{
          padding: 20,
          alignItems: "center",
          gap: 10,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button
          mode="contained-tonal"
          style={{ marginTop: 10 }}
          icon={"camera"}
          onPress={uploadAvatar}
        >
          <Text style={{ fontSize: 15, color: "#fff" }}>Change Image</Text>
        </Button>{" "}
        <Button
          mode="contained-tonal"
          style={{ marginTop: 10 }}
          icon={"delete"}
          onPress={deleteAvatar}
        >
          <Text style={{ fontSize: 15, color: "#fff" }}>Delete Image</Text>
        </Button>
      </View>
    </View>
  );
};

export default AvatarUpload;
