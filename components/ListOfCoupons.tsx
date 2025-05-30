import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/app/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import ModalDeleteConfirmation from './ModalDeleteConfirmation';
import LoadingScreen from './LoadingScreen';
import { useCouponList } from '../hooks/coupons/useCouponList';

const ListCoupons = () => {
    const { 
        coupons, loading, error, isDeleting, showDeleteModal, couponToDelete,
        loadCoupons, handleDelete, confirmDelete, cancelDelete, formatDate, getCouponStatus
    } = useCouponList();
    
    const { user } = useAuth();

    const CouponCard = ({ item }: { item: any }) => {
        const couponStatus = getCouponStatus(item.fecha_inicio, item.fecha_expiracion);

        return (
            <View className="bg-[#0B4C6C] rounded-xl shadow-md my-2 overflow-hidden">
            <View style={{ 
                height: 4, 
                backgroundColor: couponStatus.color 
            }} />
            
            <View className="p-4">
                <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-xl font-bold text-white">{item.cupon}</Text>
                    <View className="bg-[#FB8500] px-3 py-1 rounded-full">
                        <Text className="text-white font-bold">{item.descuento}% OFF</Text>
                    </View>
                </View>

    
                <View style={{ 
                    backgroundColor: couponStatus.color + '20', 
                    paddingVertical: 3, 
                    paddingHorizontal: 10, 
                    borderRadius: 12, 
                    alignSelf: 'flex-start', 
                    marginBottom: 10 
                }}>
                    <Text style={{ color: couponStatus.color, fontWeight: '600' }}>
                        {couponStatus.text}
                    </Text>
                </View>
                
                <View className="bg-[#086491] p-3 rounded-lg mb-3">
                    <View className="flex-row justify-between mb-1">
                        <Text className="text-[#fff] text-sm">Código:</Text>
                        <Text className="font-bold text-[#fff]">{item.codigo}</Text>
                    </View>
                    <View className="flex-row justify-between mb-1">
                        <Text className="text-[#fff] text-sm">Puntos requeridos:</Text>
                        <Text className="font-bold text-[#fff]">{item.puntos_requeridos}</Text>
                    </View>
                    
                
                    <View className="flex-row justify-between">
                        <Text className="text-[#fff] text-sm">Validez:</Text>
                        <Text className="font-bold text-[#fff]">
                            {formatDate(item.fecha_inicio)} - {formatDate(item.fecha_expiracion)}
                        </Text>
                    </View>
                </View>
                
                <View className="flex-row justify-between mt-2">
                    {user?.rol_id === 2 && (
                        <TouchableOpacity
                            className="flex-1 bg-[#FB8500] py-2.5 rounded-lg flex-row justify-center items-center"
                            onPress={() => {
                                router.push('../../(drawer)/payments');
                            }}
                        >
                            <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
                            <Text className="text-[#fff] font-semibold ml-1.5">Aplicar</Text>
                        </TouchableOpacity>
                    )}

            
                    {user?.rol_id === 1 && (
                        <TouchableOpacity
                            onPress={() => handleDelete(item.id, item.cupon)}
                            disabled={isDeleting === item.id}
                            className={`flex-1 py-2.5 rounded-lg flex-row justify-center items-center ${
                                isDeleting === item.id ? 'bg-[#A0AEC0]' : 'bg-[#E53E3E]'
                            }`}
                        >
                            {isDeleting === item.id ? (
                                <Text className="text-[#4A5568] font-semibold">Eliminando...</Text>
                            ) : (
                                <>
                                    <Ionicons name="trash-outline" size={18} color="#fff" />
                                    <Text className="text-[#fff] font-semibold ml-1.5">Eliminar</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
        );
    };

    const EmptyState = () => (
        <View className="flex-1 justify-center items-center h-full px-6">
            <Text className="text-xl font-bold text-[#fff] mt-4 mb-2 text-center">
                No hay cupones disponibles
            </Text>
            <Text className="text-[#718096] text-center mb-8">
                Los cupones que crees aparecerán aquí. Crea tu primer cupón para empezar.
            </Text>
        </View>
    );

    return (
        <View className="flex-1 bg-[#023046]">
            <View className="flex-1 px-4">
                {loading ? (
                    <LoadingScreen 
                        fullScreen={true} 
                        message="Cargando cupones..." 
                        backgroundColor="transparent"
                        indicatorColor="#FB8400"
                    />
                ) : error ? (
                    <View className="flex-1 justify-center items-center p-5">
                        <Ionicons name="alert-circle-outline" size={70} color="#A0AEC0" />
                        <Text className="text-xl font-bold text-[#4A5568] text-center mb-2 mt-4">
                            No pudimos cargar tus cupones
                        </Text>
                        <Text className="text-[#718096] mb-6 text-center">{error}</Text>
                        <TouchableOpacity 
                            className="bg-[#FB8500] py-3 px-6 rounded-lg flex-row items-center"
                            onPress={loadCoupons}
                        >
                            <Ionicons name="refresh-outline" size={18} color="white" />
                            <Text className="text-white font-semibold ml-2">Reintentar</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FlatList
                        data={coupons}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <CouponCard item={item} />}
                        refreshing={loading}
                        onRefresh={loadCoupons}
                        contentContainerStyle={{ 
                            flexGrow: 1, 
                            paddingVertical: 16,
                            paddingBottom: 90
                        }}
                        ListEmptyComponent={EmptyState}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>

            {user && user.rol_id === 1 && (
                <View className="bg-[#023046] px-5 py-4 border-t border-[#FFF]/30">
                    <TouchableOpacity
                        className="bg-[#FB8500] h-14 rounded-xl items-center justify-center flex-row shadow-lg"
                        onPress={() => router.push('../../(drawer)/coupons/_createCoupon')}
                    >
                        <Text className="text-white font-bold text-lg ml-2">Crear Cupón</Text>
                    </TouchableOpacity>
                </View>
            )}
            {showDeleteModal && couponToDelete && (
                <ModalDeleteConfirmation
                    title="Eliminar cupón"
                    message="¿Estás seguro que deseas eliminar este cupón?"
                    itemName={couponToDelete.name}
                    isDeleting={isDeleting === couponToDelete.id}
                    onCancel={cancelDelete}
                    onDelete={confirmDelete} 
                    visible={true}               
                />
            )}
        </View>
    );
};

export default ListCoupons;