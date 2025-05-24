import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import ImageCarousel from '../../components/CarouselComponent';
import RecommendedCourses from '../../components/CoursesComponent';
import Header from '../../components/Header';
import StatusBarComponent from '../../components/StatusBarComponent';
import TitleText from '../../components/TitleText';
import TopTutorsComponent from '../../components/TopTutorsComponent';
import '../../global.css';
import renderQuickAccessButtons from '../../hooks/home/useHomeQuickAccessButtons';
import useHomeScreen from '../../hooks/home/useHomeScreen';
import useNotificaciones from '../../hooks/useNotifications';
import { getProfileProfesor } from '../../services/GetUserProfileService';

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

  // Estado para el promedio del profesor
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

  // Determinar qué mostrar en userPoints
  const userPoints =
    user?.rol_id === 2
      ? profile?.total_puntos ?? ''
      : user?.rol_id === 3
      ? profesorProfile?.calificacion_promedio ?? ''
      : '';

  return (
    <SafeAreaView className={`flex-1 bg-[#023046]`}>
      <StatusBarComponent />
      <Header
        userName={userName}
        userPoints={userPoints}
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
    </SafeAreaView>
  );
}