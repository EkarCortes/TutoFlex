import { View, Text, Image, ScrollView, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import useGetProfesorProfile from "../../../hooks/profesorProfile/useGetProfesorProfile";
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';

const _profesorProfile = () => {
    const { profile, fetchProfile, loading: profileLoading } = useGetProfesorProfile();
    const [activeSection, setActiveSection] = useState<'Informacion Personal' | 'Informacion Academica' | 'Cursos Pendientes'>('Informacion Personal');
    const getProfileValue = (value: any) => (value ? value : "No hay datos.");
    useRefreshOnFocus(fetchProfile);
    if (profileLoading && !profile) {
        return (
            <View className="flex-1 bg-[#023047] justify-center items-center">
                <Text className="text-white text-lg text-center">Cargando perfil...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#023047]">

            <ScrollView className="flex-1">
                <View className="bg-[#086491] rounded-b-3xl items-center shadow-md">
                    <Image
                        source={{ uri: profile?.foto || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
                        className="w-40 h-40 rounded-full border-4 border-white shadow-lg" />
                    <Text className="text-2xl font-bold text-white mt-2">{getProfileValue(profile?.nombre)} {getProfileValue(profile?.apellido)}</Text>
                    <Text className="text-white text-lg opacity-80">{getProfileValue(profile?.email)}</Text>
                    <Text className="text-white text-l opacity-80 mt-1 ">{getProfileValue(profile?.descripcion)}</Text>
                    <View className="flex-row mt-4 mb-6">
                        <TouchableOpacity
                            className="bg-[#FB8500] py-1.5 px-3 rounded-full"
                            onPress={() => router.push('../../(drawer)/profesorProfile/_editProfile')}>
                            <Text className="text-white text-sm font-bold">Editar Perfil</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-[#FB8500] py-1.5 px-3 rounded-full ml-3"
                            onPress={() => router.push('../../(drawer)/profesorProfile/_review')}>
                            <Text className="text-white text-sm font-bold">Mis Reseñas</Text>
                        </TouchableOpacity>
                    </View>
                </View>


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
                        <View className="bg-[#0d6a97] p-6 rounded-2xl shadow-lg">
                            <View className="mb-4">
                                <Text className="text-white text-lg font-semibold">Nombre Completo:</Text>
                                <Text className="bg-white/10 text-lg py-2 px-4 rounded-md text-white opacity-90 mt-2">
                                    {getProfileValue(profile?.nombre)} {getProfileValue(profile?.apellido)}
                                </Text>
                            </View>
                            <View className="mb-4">
                                <Text className="text-white text-lg font-semibold">Correo Electrónico:</Text>
                                <Text className="bg-white/10 text-lg py-2 px-4 rounded-md text-white opacity-90 mt-2">
                                    {getProfileValue(profile?.email)}
                                </Text>
                            </View>
                            <View>
                                <Text className="text-white text-lg font-semibold">Número Telefónico:</Text>
                                <Text className="bg-white/10 text-lg py-2 px-4 rounded-md text-white opacity-90 mt-2">
                                    {getProfileValue(profile?.telefono_profesor)}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}

                {activeSection === 'Informacion Academica' && (
                    <View className="px-6 mt-6">
                        <Text className="text-2xl font-bold text-white mb-6 text-center">Información Académica</Text>
                        <View className="bg-[#0d6a97] p-6 rounded-2xl shadow-lg">
                            <View className="mb-4">
                                <Text className="text-white text-lg font-semibold">Universidad:</Text>
                                <Text className="bg-white/10 text-lg py-2 px-4 rounded-md text-white opacity-90 mt-2">{getProfileValue(profile?.universidad)}</Text>
                            </View>
                            <View className="mb-4">
                                <Text className="text-white text-lg font-semibold">Sede:</Text>
                                <Text className="bg-white/10 text-lg py-2 px-4 rounded-md text-white opacity-90 mt-2">
                                    {getProfileValue(profile?.sede)}
                                </Text>
                            </View>

                            <View className="mb-4">
                                <Text className="text-white text-lg font-semibold">Recinto:</Text>
                                <Text className="bg-white/10 text-lg py-2 px-4 rounded-md text-white opacity-90 mt-2">
                                    {getProfileValue(profile?.recinto)}
                                </Text>
                            </View>
                            <View>
                                <Text className="text-white text-lg font-semibold">Carrera:</Text>
                                <Text className="bg-white/10 text-lg py-2 px-2 rounded-md text-white opacity-90 mt-2">
                                    {getProfileValue(profile?.carrera)}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}

                <View className="px-6 mt-6 mb-8">
                    <Text className="text-2xl font-bold text-white mb-6 text-center">Cursos activos</Text>
                    <View className="bg-[#0d6a97] p-6 rounded-2xl shadow-lg">
                        {profile?.cursos_impartidos && profile?.cursos_impartidos.length > 0 ? (
                            profile?.cursos_impartidos.map((curso: string, index: number) => (
                                <View
                                    key={index}
                                    className="flex-row items-center bg-white/10 p-4 rounded-lg mb-3">
                                    <MaterialIcons name="book" size={24} color="#FEB702" className="mr-3" />
                                    <Text className="text-white text-lg font-medium">{curso}</Text>
                                </View>
                            ))) : (
                            <Text className="text-white text-lg font-medium text-center">
                                No hay cursos pendientes.
                            </Text>
                        )}
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

export default _profesorProfile