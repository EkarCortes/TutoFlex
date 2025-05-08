import { router } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import usePaymentReceived from '../hooks/usePaymentReceived';
import LoadingScreen from './LoadingScreen';

const PaymentCard = () => {
  const { students, loading, refreshPayments } = usePaymentReceived();

  if (loading) {
    return <LoadingScreen message="Cargando pagos recibidos..." />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={(item) => item.pago_id.toString()}
        refreshing={loading}
        onRefresh={refreshPayments}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: '../../(drawer)/receivedPayments/_detailsPayments',
                params: { pagoId: item.pago_id },
              })
            }
          >
            <Image
              source={require('../assets/images/AvatarStudents.png')}
              style={styles.avatar}
            />
            <View style={styles.cardContent}>
              <Text style={styles.studentName}>{item.estudiante_nombre}</Text>
              <Text style={styles.studentEmail}>{item.estudiante_email}</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={24} color="#FFA500" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No tienes pagos recibidos</Text>
            <Text style={styles.emptySubtitle}>
              Cuando un estudiante realice un pago, aparecerá aquí.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#096491',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#FFA500',
  },
  cardContent: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  studentEmail: {
    color: 'white',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.7,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default PaymentCard;
