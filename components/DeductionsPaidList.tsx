import React from "react";
import { View, FlatList, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DeductionsPaidList({ data, showAll, loading, error, refresh }) {
  // Mostrar solo 3 elementos si showAll es false
  const displayedData = showAll ? data : data?.slice(0, 3);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-semibold text-gray-600">Cargando deducciones...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-semibold text-red-500">{error}</Text>
      </SafeAreaView>
    );
  }

  if (!data || data.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-semibold text-gray-600">No hay deducciones pagadas</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      <FlatList
        data={displayedData}
        keyExtractor={(item, index) => index.toString()}
        refreshing={loading}
        onRefresh={refresh}
        contentContainerStyle={{ paddingBottom: 16 }}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-xl mb-3 shadow-sm">
            <Text className="text-[#023046] font-bold">
              Deducción #: {item.deduccion_id}
            </Text>
            <Text className="text-sm text-gray-700 mb-1">
              Transferencia: {item.numero_tranferencia}
            </Text>
            <Text className="text-sm text-gray-700 mb-2">Comprobante:</Text>
            {item.comprobante ? (
              <Image
                source={{ uri: item.comprobante }}
                style={{ width: "100%", height: 200, borderRadius: 10 }}
                resizeMode="contain"
              />
            ) : (
              <Text className="text-sm italic text-gray-500">Sin comprobante</Text>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}