import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DashboardScreen() {
  return (
    <View className="flex-1 bg-[#E9F1FC] pt-[3px]">
      {/* Bagian Header */}
      <View className="bg-blue-500 rounded-b-[50px] p-6">
        <Text className="text-white text-lg font-bold">Selamat datang di boring.</Text>
        <View className="flex-row justify-between items-center mt-4">
          <View>
            <Text className="text-white text-6xl font-bold">00.00,00</Text>
            <View className="flex-row items-center mt-2">
              <View className="w-3 h-3 bg-green-500 rounded-full mr-2"></View>
              <Text className="text-white text-sm">status</Text>
            </View>
          </View>
          <View className="bg-white w-16 h-16 rounded-full flex items-center justify-center">
            <Text className="text-blue-500 text-3xl">🌊</Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-6">
          <View>
            <Text className="text-white text-2xl font-bold">75 %</Text>
            <Text className="text-white text-sm">Kelembapan</Text>
          </View>
          <View>
            <Text className="text-white text-2xl font-bold">50 °C</Text>
            <Text className="text-white text-sm">Suhu boring</Text>
          </View>
        </View>
      </View>

      {/* Bagian Konten Utama */}
      <View className="flex-1 bg-white rounded-xl mt-6 shadow-md p-4"></View>

      {/* Pilih Waktu */}
      <Text className="text-blue-500 text-lg font-bold mt-6">Pilih Waktumu</Text>
      <View className="flex-row justify-between mt-4">
        <TouchableOpacity className="bg-white w-24 h-24 rounded-lg shadow-md flex items-center justify-center">
          <Text className="text-blue-500 text-3xl font-bold">1</Text>
          <Text className="text-blue-500 text-sm">Menit</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-500 w-24 h-24 rounded-lg shadow-md flex items-center justify-center">
          <Text className="text-white text-3xl font-bold">3</Text>
          <Text className="text-white text-sm">Menit</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white w-24 h-24 rounded-lg shadow-md flex items-center justify-center">
          <Text className="text-blue-500 text-3xl font-bold">5</Text>
          <Text className="text-blue-500 text-sm">Menit</Text>
        </TouchableOpacity>
      </View>

      {/* Tombol Mulai */}
      <TouchableOpacity className="bg-blue-500 rounded-full mt-6 flex-row items-center justify-between px-6 py-4">
        <Text className="text-white text-lg font-bold">Mulai</Text>
        <Text className="text-white text-xl">⏯️</Text>
      </TouchableOpacity>
    </View>
  );
}
