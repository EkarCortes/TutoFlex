import { View, Text, Image, ScrollView, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import useGetProfesorProfile from "../../../hooks/profesorProfile/useGetProfesorProfile";
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import LoadingScreen from '@/components/LoadingScreen';

const _profesorProfile = () => {
    const { profile, fetchProfile, loading: profileLoading } = useGetProfesorProfile();
    const [activeSection, setActiveSection] = useState<'Informacion Personal' | 'Informacion Academica' | 'Cursos Pendientes'>('Informacion Personal');
    const getProfileValue = (value: any) => (value ? value : "No hay datos.");
    useRefreshOnFocus(fetchProfile);
    if (profileLoading && !profile) {
        return (
            <LoadingScreen
            fullScreen={true}
            backgroundColor="transparent"
            message=""
            indicatorSize="large"
          />
        );
    }

    return (
        <View className="flex-1 bg-[#023047]">


            <View className="bg-[#086491] rounded-b-3xl items-center shadow-md">
                <Image
                    source={{ uri: profile?.foto || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
                    className="w-40 h-40 rounded-full border-2 border-[#FB8500] shadow-lg" />
                <Text className="text-2xl font-bold text-white mt-2">{getProfileValue(profile?.nombre)} {getProfileValue(profile?.apellido)}</Text>
                <Text className="text-white text-lg opacity-80">{getProfileValue(profile?.email)}</Text>
                <Text className="text-white text-l opacity-80 mt-1 ">{getProfileValue(profile?.descripcion) || ""}</Text>
                <View className="flex-row mt-4 mb-6">
                    <TouchableOpacity
                        className="bg-[#FB8500] py-1.5 px-3 rounded-xl"
                        onPress={() => router.push('../../(drawer)/profesorProfile/_editProfile')}>
                        <Text className="text-white text-sm font-bold">Editar Perfil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-[#FB8500] py-1.5 px-3 rounded-xl ml-3"
                        onPress={() => router.push('../../(drawer)/profesorProfile/_review')}>
                        <Text className="text-white text-sm font-bold">Mis Reseñas</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView className="flex-1">
                <View className="mt-8 w-full px-5">
                    <View className="flex-row justify-around rounded-xl bg-white p-3 shadow-md">
                        <View className="items-center">
                            <Text className="font-[Space-Grotesk] text-gray-500">Calificación</Text>
                            <View className="flex-row items-center space-x-1">
                                <Text className="font-[Young-Serif] text-xl font-bold text-gray-800">{getProfileValue(profile?.calificacion_promedio)}</Text>
                            </View>
                            <Text className="font-[Space-Grotesk] text-sm text-gray-400">Promedio</Text>
                        </View>
                        <View className="w-[1px] bg-gray-300" />
                        <View className="items-center">
                            <Text className="font-[Space-Grotesk] text-gray-500">Tutorías</Text>
                            <Text className="font-[Young-Serif] text-xl font-bold text-gray-800">{getProfileValue(profile?.total_cursos_impartidos)}</Text>
                            <Text className="font-[Space-Grotesk] text-sm text-gray-400">Impartidas</Text>
                        </View>
                    </View>
                </View>

                <View className="mt-8 flex-row px-5">
                    <TouchableOpacity
                        onPress={() => setActiveSection('Informacion Personal')}
                        className={`flex-1 items-center rounded-xl p-3 ${activeSection === 'Informacion Personal' ? 'bg-[#FB8500]' : 'bg-[#0B4D6C]'}`}>
                        <Text className="font-[Space-Grotesk] font-bold text-white">Personal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setActiveSection('Informacion Academica')}
                        className={`ml-2 flex-1 items-center rounded-xl p-3 ${activeSection === 'Informacion Academica' ? 'bg-[#FB8500]' : 'bg-[#0B4D6C]'}`}>
                        <Text className="font-[Space-Grotesk] font-bold text-white">Académica</Text>
                    </TouchableOpacity>
                </View>

                {activeSection === 'Informacion Personal' && (
                    <View className="px-6 mt-6">
                        <Text className="text-2xl font-bold text-white mb-6 text-center">Información Personal</Text>
                        <View className="mb-8 rounded-2xl shadow-lg p-6" style={{ backgroundColor: "#0B4C6C" }}>

                            <View className="mb-4 flex-row items-center border-b-2" style={{ borderColor: "#2379A1" }}>
                                <MaterialIcons name="person" size={22} color="#8FCBE6" style={{ marginRight: 8 }} />
                                <Text className="flex-1 text-base py-2 text-white">
                                    {getProfileValue(profile?.nombre)} {getProfileValue(profile?.apellido)}
                                </Text>
                            </View>
                            <View className="mb-4 flex-row items-center border-b-2" style={{ borderColor: "#2379A1" }}>
                                <MaterialIcons name="email" size={22} color="#8FCBE6" style={{ marginRight: 8 }} />
                                <Text className="flex-1 text-base py-2 text-white">
                                    {getProfileValue(profile?.email)}
                                </Text>
                            </View>
                            <View className="mb-4 flex-row items-center border-b-2" style={{ borderColor: "#2379A1" }}>
                                <MaterialIcons name="call" size={22} color="#8FCBE6" style={{ marginRight: 8 }} />
                                <Text className="flex-1 text-base py-2 text-white">
                                    {getProfileValue(profile?.telefono_profesor)}
                                </Text>
                            </View>
                            <View className="flex-row items-center border-b-2" style={{ borderColor: "#2379A1" }}>
                                <MaterialIcons name="info" size={22} color="#8FCBE6" style={{ marginRight: 8 }} />
                                <Text className="flex-1 text-base py-2 text-white">
                                    {getProfileValue(profile?.descripcion)}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}

                {activeSection === 'Informacion Academica' && (
                    <View className="px-6 mt-6">
                        <Text className="text-2xl font-bold text-white mb-6 text-center">Información Académica</Text>
                        <View className="mb-8 rounded-2xl shadow-lg p-6" style={{ backgroundColor: "#0B4C6C" }}>
                            <View className="mb-4 flex-row items-center border-b-2" style={{ borderColor: "#2379A1" }}>
                                <MaterialIcons name="school" size={22} color="#8FCBE6" style={{ marginRight: 8 }} />
                                <Text className="flex-1 text-base py-2 text-white">
                                    {getProfileValue(profile?.universidad)}
                                </Text>
                            </View>
                            <View className="mb-4 flex-row items-center border-b-2" style={{ borderColor: "#2379A1" }}>
                                <MaterialIcons name="business" size={22} color="#8FCBE6" style={{ marginRight: 8 }} />
                                <Text className="flex-1 text-base py-2 text-white">
                                    {getProfileValue(profile?.sede)}
                                </Text>
                            </View>
                            <View className="mb-4 flex-row items-center border-b-2" style={{ borderColor: "#2379A1" }}>
                                <MaterialIcons name="location-on" size={22} color="#8FCBE6" style={{ marginRight: 8 }} />
                                <Text className="flex-1 text-base py-2 text-white">
                                    {getProfileValue(profile?.recinto)}
                                </Text>
                            </View>
                            <View className="flex-row items-center border-b-2" style={{ borderColor: "#2379A1" }}>
                                <MaterialIcons name="school" size={22} color="#8FCBE6" style={{ marginRight: 8 }} />
                                <Text className="flex-1 text-base py-2 text-white">
                                    {getProfileValue(profile?.carrera)}
                                </Text>
                            </View>

                        </View>
                    </View>
                )}

                <View className="px-6 mt-6 mb-8">
                    <Text className="text-2xl font-bold text-white mb-6 text-center">Cursos activos</Text>
                    <View className="mb-8 rounded-2xl shadow-lg p-6" style={{ backgroundColor: "#0B4C6C" }}>
                        <Text className="text-xl font-bold text-white mb-4 tracking-wide">
                            Cursos Activos
                        </Text>
                        {profile?.cursos_impartidos && profile?.cursos_impartidos.length > 0 ? (
                            profile.cursos_impartidos.map((curso: string, index: number) => (
                                <View
                                    key={index}
                                    className="flex-row items-center border-b-2 mb-2"
                                    style={{ borderColor: "#2379A1" }}
                                >
                                    <MaterialIcons name="book" size={22} color="#8FCBE6" style={{ marginRight: 8 }} />
                                    <Text className="flex-1 text-base py-2 text-white">{curso}</Text>
                                </View>
                            ))
                        ) : (
                            <Text className="text-white text-base py-2 text-center">
                                No hay cursos activos.
                            </Text>
                        )}
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

export default _profesorProfile