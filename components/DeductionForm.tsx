import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import ButtonBotton from "./ButtonBottom";  

const DeductionForm = ({ totalAmount }) => {
  const [deduction, setDeduction] = useState(0);

  useEffect(() => {
    
    if (totalAmount) {
      const calculatedDeduction = totalAmount * 0.02;  
      setDeduction(calculatedDeduction);
    }
  }, [totalAmount]);

  return (
    <View className="bg-[#2c81ac] p-4 rounded-lg mt-5">
      <Text className="text-xl m-4 text-white text-center font-bold">Monto Facturado</Text>
      
      <Text className="text-white font-bold text-base mb-2">
        Monto Total: ₡{totalAmount.toFixed(2)}
      </Text>

      {/* Mostrar el monto de la deducción (2%) */}
      <Text className="text-white font-bold text-base mb-2">
        Deducción (2%): ₡{deduction.toFixed(2)}
      </Text>

      {/* Botón para aplicar la deducción */}
      <ButtonBotton title="Aplicar Deducción" onPress={() => console.log("Deducción aplicada")} />
    </View>
  );
};

export default DeductionForm;

