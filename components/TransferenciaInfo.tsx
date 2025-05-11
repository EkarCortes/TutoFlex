import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

interface TransferenciaInfoProps {
  onTransferNumberChange: (number: string) => void;
}

const TransferenciaInfo: React.FC<TransferenciaInfoProps> = ({ onTransferNumberChange }) => {
  return (
    <View className="bg-[#0B4C6D] rounded-2xl p-3 mb-5">
      <View style={styles.gap}>
        <Text className="text-lg text-white" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
          Número de Transferencia
        </Text>
        <View className="flex-row items-center bg-white rounded-xl">
          <Text className="text-base text-gray-500 pl-2">#</Text>
          <TextInput
            className="flex-1 text-base pl-2"
            placeholder="Ingrese el número de transferencia"
            placeholderTextColor="#A9A9A9"
            onChangeText={onTransferNumberChange} // Captura el número ingresado
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gap: {
    gap: 16,
  },
});

export default TransferenciaInfo;