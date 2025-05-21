import React, { useState } from "react";
import { View, FlatList, Text, Image, Modal, TouchableOpacity, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DeductionsPaidList({ data, showAll, loading, error, refresh }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const displayedData = showAll ? data : data?.slice(0, 3);

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-transparent">
        <Text className="text-lg font-semibold text-red-400">{error}</Text>
      </SafeAreaView>
    );
  }

  if (!data || data.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-transparent">
        <Ionicons name="file-tray-outline" size={48} color="#FB8500" />
        <Text className="text-lg font-semibold text-white mt-2">No hay deducciones pagadas</Text>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1">
      <Modal
        visible={modalVisible}
        transparent={true}
        statusBarTranslucent={true}
        hardwareAccelerated={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          className="flex-1 items-center justify-center bg-black/70"
          
          onPress={() => setModalVisible(false)}
        >
          {modalImage && (
            <Image
              source={{ uri: modalImage }}
              style={{ width: "90%", height: "70%", borderRadius: 16, resizeMode: "contain" }}
            />
          )}

        </Pressable>
      </Modal>
      <FlatList
        data={displayedData}
        keyExtractor={(item, index) => index.toString()}
        refreshing={loading}
        onRefresh={refresh}
        contentContainerStyle={{ paddingBottom: 8 }}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View
            className="rounded-2xl shadow-lg mb-6 overflow-hidden"
            style={{ backgroundColor: "#0A4C6C" }}
          >
            <View style={{ height: 4, backgroundColor: "#FB8500" }} />
            <View className="p-5">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-bold text-white">
                  Deducción #{item.deduccion_id}
                </Text>
              </View>
              <View className="bg-[#2379A1] p-3 rounded-xl mb-3">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-[#fff] text-sm">Transferencia:</Text>
                  <Text className="font-bold text-white">{item.numero_tranferencia}</Text>
                </View>
                <View className="flex-row justify-between mb-1">
                  <Text className="text-[#fff] text-sm">Fecha de pago:</Text>
                  <Text className="font-bold text-white">
                    {item.fecha_deduccion?.substring(0, 10) || '---'}
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-[#fff] text-sm mb-1">Comprobante:</Text>
                {item.comprobante ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      setModalImage(item.comprobante);
                      setModalVisible(true);
                    }}
                  >
                    <View className="rounded-lg overflow-hidden border border-[#FB8500] bg-white/10">
                      <Image
                        source={{ uri: item.comprobante }}
                        style={{ width: "100%", height: 180, borderRadius: 10 }}
                        resizeMode="cover"
                      />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <Text className="text-sm italic text-gray-300">Sin comprobante</Text>
                )}
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}