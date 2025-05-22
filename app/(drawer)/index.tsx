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
import useNotificaciones from '../../hooks/useNotifications';

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

  React.useEffect(() => {
    console.log('expoPushToken', expoPushToken);
    console.log('notifications', notifications);
  }, [expoPushToken, notifications]);

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
    </SafeAreaView>
  );
}