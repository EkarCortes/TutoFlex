import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import useRanking from '../hooks/useRanking';
import LoadingScreen from './LoadingScreen';

const ListCoupons = () => {
    const { ranking, updateRanking } = useRanking();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRanking = async () => {
            await updateRanking();
            setLoading(false);
        };
        loadRanking();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {loading ? (
                <LoadingScreen
                    message=""
                    fullScreen={true}
                    indicatorColor="#FA8500"
                    textColor="#fff"
                    indicatorSize="large"
                />
            ) : (
                <View style={{  paddingHorizontal: 16, paddingBottom: 16, flex: 1 }}>
                    
                    <FlatList
                        data={ranking}
                        keyExtractor={(item) => item.estudiante_id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: '#fff',
                                    padding: 18,
                                    marginVertical: 10,
                                    borderRadius: 16,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.15,
                                    shadowRadius: 6,
                                    elevation: 3,
                                    alignItems: 'center',
                                    borderLeftWidth: 7,
                                    borderLeftColor: index === 0
                                        ? '#FA8500'
                                        : index === 1
                                        ? '#096491'
                                        : '#0B4D6C',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 22,
                                        fontWeight: 'bold',
                                        color: '#FA8500',
                                        marginRight: 18,
                                        width: 44,
                                        textAlign: 'center',
                                    }}
                                >
                                    #{index + 1}
                                </Text>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0B4D6C' }}>
                                        {item.nombre} {item.apellido}
                                    </Text>
                                    <Text style={{ color: '#096491', fontWeight: '700', marginTop: 2 }}>
                                        Puntos: {item.puntos_ranking}
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

export default ListCoupons;