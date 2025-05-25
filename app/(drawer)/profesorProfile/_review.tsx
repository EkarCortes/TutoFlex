import LoadingScreen from '@/components/LoadingScreen';
import useGetProfesorProfile from '@/hooks/profesorProfile/useGetProfesorProfile';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useProfesorReviews } from '../../../hooks/profesorProfile/useProfesorReviews';
import HeaderScreens from '@/components/HeaderScreens';
const ReviewScreen = () => {
  const { profile } = useGetProfesorProfile();
  const profesorId = Number(profile?.profesor_id);
  const shouldFetch = !!profesorId && !isNaN(profesorId);
  const { reviews, loading, error } = useProfesorReviews(shouldFetch ? profesorId : 0);

  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(7);
  const [showFilter, setShowFilter] = useState(false);

  const filteredReviews = useMemo(
    () => (starFilter ? reviews.filter(r => r.estrellas === starFilter) : reviews),
    [reviews, starFilter]
  );
  const displayedReviews = filteredReviews.slice(0, visibleReviews);

  return (
    <SafeAreaView className="flex-1 bg-[#023047]">
      <HeaderScreens title={"Gestionar Cursos"} />

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LoadingScreen
            message=""
            fullScreen={false}
            backgroundColor="transparent"
            indicatorColor="#FB8500"
            textColor="white"
            indicatorSize="large"
          />
        </View>
      ) : (
        <>
          <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
            {error ? (
              <Text className="text-red-500 text-center mt-10">{error}</Text>
            ) : displayedReviews.length > 0 ? (
              <>
                {displayedReviews.map((review, idx) => (
                  <View key={idx} className="mb-4 rounded-xl bg-white p-4 shadow-md">
                    <View className="flex-row items-center mb-2">
                      <Text className="font-bold text-gray-800 mr-2">
                        {review.nombre_estudiante || 'Anónimo'}
                      </Text>
                      <View className="flex-row">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FontAwesome
                            key={star}
                            name={star <= review.estrellas ? 'star' : 'star-o'}
                            size={14}
                            color="#FFD700"
                            style={{ marginRight: 2 }}
                          />
                        ))}
                      </View>
                    </View>
                    <Text className="text-gray-600">{review.comentario}</Text>
                  </View>
                ))}
                {filteredReviews.length > visibleReviews && (
                  <TouchableOpacity
                    onPress={() => setVisibleReviews(visibleReviews + 3)}
                    className="bg-[#0B4D6C] py-3 rounded-xl items-center mb-4"
                  >
                    <Text className="font-[Space-Grotesk] text-white font-bold">
                      Ver más reseñas ({filteredReviews.length - visibleReviews} restantes)
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <Text className="text-white text-center mt-10">No hay reseñas disponibles.</Text>
            )}
          </ScrollView>

          {/* Botón flotante minimalista */}
          {showFilter && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setShowFilter(false)}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                zIndex: 10,
                backgroundColor: 'rgba(0,0,0,0.01)',
              }}
            >
              <View style={{ flex: 1 }}>
                <View style={{
                  position: 'absolute',
                  bottom: 84,
                  right: 24,
                  backgroundColor: '#0B4C6C',
                  borderRadius: 16,
                  paddingVertical: 8,
                  minWidth: 140,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 6,
                  elevation: 6,
                }}>
                  <TouchableOpacity
                    onPress={() => { setStarFilter(null); setShowFilter(false); }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 8,
                      paddingHorizontal: 18,
                      backgroundColor: starFilter === null ? '#FB8500' : 'transparent',
                      borderRadius: 5,
                    }}
                  >
                    <MaterialIcons name="star" size={18} color="#FFD700" />
                    <Text style={{
                      marginLeft: 8,
                      fontWeight: 'bold',
                      color: starFilter === null ? '#fff' : '#fff'
                    }}>Todas</Text>
                  </TouchableOpacity>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => { setStarFilter(star); setShowFilter(false); }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 8,
                        paddingHorizontal: 18,
                        backgroundColor: starFilter === star ? '#FB8500' : 'transparent',
                        borderRadius: 12,
                      }}
                    >
                      <View style={{ flexDirection: 'row', marginRight: 6 }}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <FontAwesome
                            key={s}
                            name={s <= star ? 'star' : 'star-o'}
                            size={14}
                            color="#FFD700"
                          />
                        ))}
                      </View>
                      <Text style={{
                        fontWeight: 'bold',
                        color: starFilter === star ? '#fff' : '#fff'
                      }}>{star}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          )}
          <View style={{ position: 'absolute', bottom: 28, right: 24, alignItems: 'flex-end', zIndex: 11 }}>
            <TouchableOpacity
              onPress={() => setShowFilter(!showFilter)}
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
              activeOpacity={0.85}
            >
              <MaterialIcons name="filter-list" size={26} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default ReviewScreen;