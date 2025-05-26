import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, Linking, Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ImageCarousel from '../../components/CarouselComponent';
import RecommendedCourses from '../../components/CoursesComponent';
import Header from '../../components/Header';
import StatusBarComponent from '../../components/StatusBarComponent';
import TitleText from '../../components/TitleText';
import TopTutorsComponent from '../../components/TopTutorsComponent';
import '../../global.css';
import renderQuickAccessButtons from '../../hooks/home/useHomeQuickAccessButtons';
import useHomeScreen from '../../hooks/home/useHomeScreen';
import useAnimatedOpacity from '../../hooks/home/useAnimatedOpacity';
import useNotificaciones from '../../hooks/useNotifications';
import { getProfileProfesor } from '../../services/GetUserProfileService';
import useHelpLinks from '@/hooks/home/useHelpLinks';

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

  const { expoPushToken, notifications } = useNotificaciones();

  const [profesorProfile, setProfesorProfile] = React.useState<any>(null);

  React.useEffect(() => {
    if (user?.rol_id === 3) {
      getProfileProfesor().then(setProfesorProfile);
    }
  }, [user?.rol_id]);

  React.useEffect(() => {
    console.log('expoPushToken', expoPushToken);
    console.log('notifications', notifications);
  }, [expoPushToken, notifications]);


  const userPoints =
    user?.rol_id === 2
      ? profile?.total_puntos ?? ''
      : user?.rol_id === 3
        ? profesorProfile?.calificacion_promedio ?? ''
        : '';
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const fadeOpacity = useAnimatedOpacity(scrollY, [0, 200]);
  const carouselOpacity = useAnimatedOpacity(scrollY, [100, 500]);
  const cursosOpacity = useAnimatedOpacity(scrollY, [300, 1700]);

  const scrollViewRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowScrollTop(offsetY > 350);
      }
    }
  );
  const { handleWhatsApp, handleEmail } = useHelpLinks();

  return (
    <SafeAreaView className={`flex-1 bg-[#023046]`}>
      <Header
        userName={userName}
        userPoints={userPoints}
        searchQuery={searchQuery}
        rolId={user?.rol_id}
        setSearchQuery={setSearchQuery}
      />
      <Animated.ScrollView
        ref={scrollViewRef}
        className={`flex-1 bg-[#023046]`}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >

        <Animated.View style={{ opacity: fadeOpacity }}>
          <View className={`h-auto`}>
            <Text className="text-white ml-5 mt-8 text-2xl" style={{ fontFamily: 'SpaceGrotesk-Bold' }}>Acceso Rápido</Text>
            <View className={`flex-1 items-center`}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className={`flex-row mt-5`}>
                {renderQuickAccessButtons()}
              </ScrollView>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: carouselOpacity }}>
          <ImageCarousel />
        </Animated.View>


        <Animated.View style={{ opacity: cursosOpacity }}>
          <TitleText textTitle={'Cursos Recomendados'} />
          <RecommendedCourses />
        </Animated.View>

        <TitleText textTitle={'Tutores Recomendados'} />
        <TopTutorsComponent />

        <View className="mt-8 mx-5 p-5  bg-[#0B4D6D] rounded-xl shadow">
          <Text className="text-lg font-bold text-[#FFF] mb-3">¿Necesitas Ayuda?</Text>
          <View className="flex-row justify-between mb-3">
            <TouchableOpacity
              className="items-center flex-1"
              activeOpacity={0.8}
              onPress={handleWhatsApp}
            >
              <Ionicons name="logo-whatsapp" size={28} color="#25D366" />
              <Text className="mt-1 text-xs text-[#FFF]">WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="items-center flex-1"
              activeOpacity={0.8}
              onPress={handleEmail}
            >
              <Ionicons name="mail" size={28} color="#73B0D3" />
              <Text className="mt-1 text-xs text-[#FFF]">Enviar Email</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-xs text-white text-center">
            Horario de atención: Lun-Vie 9:00 AM - 6:00 PM
          </Text>
        </View>
      </Animated.ScrollView>
      <View style={{flex: 1, position: 'absolute', width: '100%', height: '100%'}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showSessionExpired}
          hardwareAccelerated={true} 
          statusBarTranslucent={true}
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