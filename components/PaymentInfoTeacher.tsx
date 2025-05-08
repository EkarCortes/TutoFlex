import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type PagoInfoProps = {
  nombre: string;
  email: string;
  fecha: string;
  monto: string;
  telefono: string;
};

const PaymentInfoTeacher: React.FC<PagoInfoProps> = ({ nombre, email, fecha, monto, telefono }) => {
  return (
    <View className="bg-[#2c81ac] rounded-xl p-4 mb-4">
      <View className="flex-row items-center mb-2">
      <MaterialIcons name="account-circle" size={28} color="#FEB602" />
      <Text className='text-lg text-white'> {nombre}</Text>
      </View>
      <View className="flex-row items-center mb-2">
      <MaterialIcons name="mail" size={28} color="#FEB602" />
      <Text className='text-lg text-white'> {email}</Text>
      </View>
      <View className="flex-row items-center">
      <MaterialIcons name="phone" size={28} color="#FEB602" />
      <Text className='text-lg text-white'> {telefono}</Text>
      </View>
      <View className="flex-row items-center mb-2">
      <MaterialIcons name="attach-money" size={28} color="#FEB602" />
      <Text className='text-lg text-white'> {monto}</Text>
      </View>
      <View className="flex-row items-center mb-2">
      <MaterialIcons name="calendar-month" size={28} color="#FEB602" />
      <Text className='text-lg text-white'> {fecha}</Text>
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'SpaceGrotesk_400Regular',
    color: 'black',
  },
});

export default PaymentInfoTeacher;