import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { ref, get, set, update, onValue } from "firebase/database";
import { db } from "../../firebase";
import { Image } from "expo-image";
import { LineChart } from "react-native-chart-kit";

export default function DashboardScreen() {
  const [kelembapan, setKelembapan] = useState(0);
  const [suhu, setSuhu] = useState(0);
  const [suhuHistory, setSuhuHistory] = useState<number[]>([0, 0, 0, 0, 0]);
  const [selectedTime, setSelectedTime] = useState<number | null>(3); // Waktu yang dipilih
  const [isActivated, setIsActivated] = useState(false); // Status tombol Mulai/Berhenti
  const [status, setStatus] = useState(false); // Status barang
  const [remainingTime, setRemainingTime] = useState<number | null>(null); // Waktu tersisa

  // Fungsi untuk memperbarui nilai `start` di Firebase
  const setStartInFirebase = (startValue: boolean) => {
    const sensorRef = ref(db, "sensor");
    update(sensorRef, { start: startValue })
      .then(() => console.log(`Start set to ${startValue}`))
      .catch((error) => console.error("Error updating start:", error));
  };

  // Listener Firebase untuk `status`
  useEffect(() => {
    const statusRef = ref(db, "sensor/status");
    const unsubscribe = onValue(statusRef, (snapshot) => {
      const statusValue = snapshot.val();
      if (statusValue !== null) {
        setStatus(statusValue); // Perbarui status barang dari Firebase
      }
    });

    return () => unsubscribe();
  }, []);

  // Listener Firebase untuk sinkronisasi `start`
  useEffect(() => {
    const sensorRef = ref(db, "sensor/start");
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const startValue = snapshot.val();
      setIsActivated(startValue); // Sinkronkan status tombol dengan Firebase
    });

    return () => unsubscribe();
  }, []);

  // Stopwatch logic
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isActivated && selectedTime !== null) {
      setRemainingTime(selectedTime * 60); // Set waktu tersisa berdasarkan waktu yang dipilih

      timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev && prev > 1) {
            return prev - 1;
          } else {
            clearInterval(timer!);
            setStartInFirebase(false); // Hentikan `start` di Firebase
            return null; // Reset waktu tersisa
          }
        });
      }, 1000);
    } else if (!isActivated) {
      clearInterval(timer!);
      setRemainingTime(null); // Reset stopwatch
    }

    return () => clearInterval(timer!);
  }, [isActivated, selectedTime]);

  // Fungsi untuk membaca data dari Firebase
  useEffect(() => {
    const fetchSensorData = () => {
      const dataRef = ref(db, "sensor");
      get(dataRef).then((snapshot) => {
        const sensorData = snapshot.val();
        if (sensorData) {
          setKelembapan(sensorData.kelembapan);
          setSuhu(sensorData.suhu);
          setSuhuHistory((prev) => [...prev, sensorData.suhu].slice(-5));
        }
      });
    };

    const interval = setInterval(() => {
      fetchSensorData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fungsi untuk mengirim waktu ke Firebase
  const sendTimeToFirebase = (time: number) => {
    setSelectedTime(time);
    const timeRef = ref(db, "sensor/timer");
    set(timeRef, time)
      .then(() =>
        console.log(`Waktu ${time} menit berhasil dikirim ke Firebase.`)
      )
      .catch((error) =>
        console.error("Gagal mengirim waktu ke Firebase:", error)
      );
  };

  // Format waktu ke dalam format MM:SS
  const formatTime = (time: number | null): string => {
    if (time === null) return "00:00:00";

    const hours = Math.floor(time / 3600); // Hitung jam
    const minutes = Math.floor((time % 3600) / 60); // Hitung menit
    const seconds = time % 60; // Sisa detik

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <View className="flex-1 bg-[#E9F1FC]">
      {/* Header */}
      <View className="bg-blue-500 rounded-b-[50px] py-4 px-8">
        <Text className="text-white text-[17px] font-goliregular pt-4">
          Selamat datang di boring.
        </Text>
        <View>
          <View className="flex-row justify-between items-center pt-6">
            <Text className="text-white text-6xl font-golibold">
              {formatTime(remainingTime)}
            </Text>
            <Image
              source={require("./../../assets/logoputih.svg")}
              style={{ width: 60, height: 60 }}
              contentFit="contain"
            />
          </View>
        </View>
        <View className="flex-row items-center">
          <View className="flex-row items-center">
            <Text className="text-white font-golibold text-xl pt-2 pr-4">
              Status Barang
            </Text>
            <View
              className={`w-5 h-5 rounded-full ${
                status ? "bg-green-500" : "bg-red-500"
              }`}
            />
          </View>
        </View>

        <View className="flex-row justify-center pt-2">
          <View className="pr-20">
            <Text className="text-white text-[28px] font-golibold">
              {kelembapan} %
            </Text>
            <Text className="text-white text-lg font-golilight">
              Kelembapan
            </Text>
          </View>
          <View>
            <Text className="text-white text-[28px] font-golibold">
              {suhu}°C
            </Text>
            <Text className="text-white text-lg font-golilight">
              Suhu boring
            </Text>
          </View>
        </View>
      </View>

      {/* Bagian Konten Utama */}
      <View className="bg-white rounded-xl mx-4 mt-4 p-2">
        <View className="flex-col items-center">
          <Text className="text-blue-500 text-xl font-golibold mb-4">
            Grafik Suhu
          </Text>
          <LineChart
            data={{
              labels: Array.from({ length: suhuHistory.length }, (_, i) =>
                (i + 1).toString()
              ),
              datasets: [
                {
                  data: suhuHistory,
                },
              ],
            }}
            width={Dimensions.get("window").width - 60} // Width chart
            height={170}
            yAxisSuffix="°C"
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#3498db",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </View>

      {/* Pilih Waktu */}
      <Text className="text-blue-500 text-xl font-golibold pt-6 mx-12">
        Pilih Waktumu
      </Text>
      <View className="flex-row justify-between pt-2 mx-12">
        {[3, 5, 7].map((time) => (
          <TouchableOpacity
            key={time}
            className={`${
              selectedTime === time ? "bg-[#24427B]" : "bg-white"
            } w-24 h-28 rounded-lg shadow-md flex items-center justify-center py-8`}
            onPress={() => sendTimeToFirebase(time)}
          >
            <Image
              source={require("./../../assets/time.svg")}
              style={{ width: 30, height: 30 }}
              contentFit="contain"
            />
            <Text
              className={`${
                selectedTime === time ? "text-white" : "text-blue-500"
              } text-3xl font-bold`}
            >
              {time}
            </Text>
            <Text
              className={`${
                selectedTime === time ? "text-white" : "text-blue-500"
              } text-sm`}
            >
              Menit
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tombol Mulai/Berhenti */}
      <View className="flex-1 bg-[#E9F1FC] justify-center items-center">
        <TouchableOpacity
          className={`w-[72px] h-[72px] rounded-full flex items-center justify-center ${
            isActivated ? "bg-red-500" : "bg-green-500"
          }`}
          onPress={() => setStartInFirebase(!isActivated)}
        >
          {isActivated ? (
            <Image
              source={require("./../../assets/stop.svg")}
              style={{ width: 50, height: 50 }}
              contentFit="contain"
            />
          ) : (
            <Image
              source={require("./../../assets/power.svg")}
              style={{ width: 50, height: 50 }}
              contentFit="contain"
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
