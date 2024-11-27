import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    // Navigasi ke HomeScreen setelah 5 detik
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 3000);

    // Membersihkan timer jika komponen unmount
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-[#E9F1FC]">
      <Image
        source={require("./../../assets/logo.svg")}
        style={{ width: 200, height: 200 }}
        contentFit="contain" // Atur cara gambar dipasang
      />
    </View>
  );
}
