import React from 'react';
import { View, SafeAreaView, ScrollView, Modal, Text, TouchableOpacity } from 'react-native';
import '../../global.css';
import Header from '../../components/Header';
import ImageCarousel from '../../components/CarouselComponent';
import RecommendedCourses from '../../components/CoursesComponent';
import TitleText from '../../components/TitleText';
import StatusBarComponent from '../../components/StatusBarComponent';
import renderQuickAccessButtons from '../../hooks/home/useHomeQuickAccessButtons';
import TopTutorsComponent from '../../components/TopTutorsComponent';
import { MaterialIcons } from "@expo/vector-icons";
import useHomeScreen from '../../hooks/home/useHomeScreen';

export default function HomeScreen() {
  const {
    user,
    profile,
    searchQuery,
    setSearchQuery,
    showSessionExpired,
    userName,
    handleLogin,
  } = useHomeScreen();

  return (
    <SafeAreaView className={`flex-1 bg-[#023046]`}>
      <StatusBarComponent />
      <Header
        userName={userName}
        userPoints={profile?.total_puntos ?? '' }
        searchQuery={searchQuery}
        rolId={user?.rol_id}
        setSearchQuery={setSearchQuery}
      />
      <ScrollView className={`flex-1 bg-[#023046]`} showsVerticalScrollIndicator={false}>
        <View className={`h-auto`}>
          <TitleText textTitle={'Acceso Rápidos'}></TitleText>
          <View className={`flex-1 items-center`}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className={`flex-row mt-5`}>
              {renderQuickAccessButtons()}
            </ScrollView>
          </View>
        </View>
        <ImageCarousel />
        <TitleText textTitle={'Cursos Recomendados'}></TitleText>
        <RecommendedCourses />
        <TitleText textTitle={'Tutores Recomendados'}></TitleText>
      
        <TopTutorsComponent />
      </ScrollView>

      <View style={{flex: 1, position: 'absolute', width: '100%', height: '100%'}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showSessionExpired}
          onRequestClose={() => setShowSessionExpired(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/80">
            <View className="bg-[#023047] w-11/12 rounded-xl p-6 shadow-lg max-w-md">
              <View className="items-center mb-4">
                <MaterialIcons name="timer-off" size={48} color="#FB8500" />
                <Text className="text-white text-2xl font-bold text-center mt-2 mb-1">
                  Sesión Expirada
                </Text>
                <Text className="text-[#B0BFCB] text-base text-center mb-4">
                  Tu sesión ha expirado. Por favor inicia sesión nuevamente para continuar.
                </Text>
              </View>

              <TouchableOpacity
                onPress={handleLogin}
                className="bg-[#FB8500] h-14 rounded-xl items-center justify-center flex-row shadow-md"
              >
                <MaterialIcons name="login" size={24} color="white" />
                <Text className="text-white font-bold text-lg ml-2">Iniciar Sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}