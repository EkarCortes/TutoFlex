import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import useRanking from '../hooks/useRanking';

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
            <View style={{ flex: 1, padding: 16 }}>
                {loading ? (
                    <ActivityIndicator size="large" color="#2C81AD" />
                ) : (
                    <FlatList
                        data={ranking}
                        keyExtractor={(item) => item.estudiante_id.toString()}
                        renderItem={({ item, index }) => (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    padding: 16,
                                    marginVertical: 8,
                                    borderRadius: 8,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 4,
                                    elevation: 2,
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: '#FB8500',
                                        marginRight: 16,
                                        width: 40,
                                    }}
                                >
                                    #{index + 1}
                                </Text>

                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#4A5568' }}>
                                        {item.nombre} {item.apellido}
                                    </Text>
                                    <Text style={{ color: '#A0AEC0', fontWeight: '700' }}>
                                        Puntos: {item.puntos_ranking}
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                )}
            </View>
        </View>
    );
};

export default ListCoupons;
