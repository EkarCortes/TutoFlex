import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RoundedHeader from '../../../components/HeaderScreens';
import DeductionsPaidList from '../../../components/DeductionsPaidList';
import useAllDeductionsPaid from '../../../hooks/deductions/useAllDeductionsPaid';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import LoadingScreen from '@/components/LoadingScreen';

const History = () => {
    const [showAll, setShowAll] = useState(true);
    const [orderDesc, setOrderDesc] = useState(true); // Nuevo estado para el orden
    const { deductionsPaid, loading, error, refresh } = useAllDeductionsPaid();

    useRefreshOnFocus(refresh);

    // Ordenar por número de deducción
    const sortedDeductions = deductionsPaid
        ? [...deductionsPaid].sort((a, b) => {
            const numA = Number(a.deduccion_id) || 0;
            const numB = Number(b.deduccion_id) || 0;
            return orderDesc ? numB - numA : numA - numB;
        })
        : [];

    return (
        <View className="flex-1 bg-[#023046]">
            <RoundedHeader title="Historial de Deducciones" />

            {loading ? (
                <View className="flex-1">
                    <LoadingScreen
                        message=""
                        fullScreen={true}
                        backgroundColor="#023047"
                        indicatorColor="#FB8500"
                        textColor="white"
                        indicatorSize="large"
                    />
                </View>
            ) : (
                <ScrollView
                    contentContainerStyle={{ padding: 20, gap: 24 }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
                >
                    <DeductionsPaidList
                        data={sortedDeductions}
                        showAll={showAll}
                        loading={loading}
                        error={error}
                        refresh={refresh}
                    />
                </ScrollView>
            )}

            {/* Botón flotante para cambiar el orden */}
            <View
                style={{
                    position: "absolute",
                    bottom: 32,
                    right: 24,
                    alignItems: "center",
                }}
                pointerEvents="box-none"
            >
                <TouchableOpacity
                    onPress={() => setOrderDesc((prev) => !prev)}
                    activeOpacity={0.8}
                    style={{
                        backgroundColor: "#096491",
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 32,
                        width: 56,
                        height: 56,
                        justifyContent: "center",
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 5,
                    }}
                >
                    <Ionicons
                        name={orderDesc ? "arrow-down" : "arrow-up"}
                        size={28}
                        color="#fff"
                    />
                </TouchableOpacity>
                <Text style={{ color: "#fff", marginTop: 6, fontSize: 13, opacity: 0.8 }}>
                {orderDesc ? "Recientes" : "Antiguos"}
                </Text>
            </View>
        </View>
    );
};

export default History;