import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialIcons, Fontisto, FontAwesome, Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import useInicioLogic from '../../../hooks/filter/useFilter';
import CardProfesor from '../../../components/CardProfesor';

export default function Inicio() {
  const { searchQuery } = useLocalSearchParams();
  const [mostrarModalFiltro, setMostrarModalFiltro] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    mostrarPaises, setMostrarPaises, mostrarUniversidad, setMostrarUniversidad, mostrarcarrera, setMostrarcarrera,
    mostrarclasificacion, setMostrarClasificacion, mostrarFecha, setMostrarFecha, mostrarModalidad, setMostrarModalidad,
    datosFiltrados, busqueda, setBusqueda, paisSeleccionado, seleccionPais, universidadSeleccionado, seleccionUniversidad,
    carreraSeleccionado, seleccionCarrera, clasificacionSeleccionada, seleccionaMateria, fechaSeleccionada, seleccionaFecha,
    modalidadSeleccionada, seleccionaModalidad, reiniciarFiltros, paisesArray, universidadesArray, carrerasArray,
    classifications, loadingClasificaciones
  } = useInicioLogic();

  useEffect(() => {
    if (searchQuery) {
      setBusqueda(searchQuery);
    }
    setTimeout(() => setLoading(false), 2000);
  }, [searchQuery]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#082F49]">
        <ActivityIndicator size="large" color="orange" />
        <Text className="text-white mt-4">Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#082F49] p-4">
      <View className="mb-4 flex-col rounded-xl bg-[#8ECAE7] px-4 py-2">
        <View className='flex-row items-center'>
          <TextInput
            className="flex-1 text-black"
            placeholder="Buscar materia..."
            placeholderTextColor="#414962"
            value={busqueda}
            onChangeText={setBusqueda}
          />
          <TouchableOpacity onPress={() => setMostrarModalFiltro(true)}>
            <MaterialIcons name="filter-alt" size={24} color="#082F49" />
          </TouchableOpacity>
        </View>
      </View>
      <View className='justify-center items-center text-center'>
        {(paisSeleccionado || universidadSeleccionado || carreraSeleccionado || clasificacionSeleccionada || fechaSeleccionada || modalidadSeleccionada) && (
          <View className="flex-row items-center justify-between mt-2 mb-10 bg-gray-200 rounded-full px-4 py-2 max-w-80 text-center">
            <Text className="text-gray-700 text-sm text-center ">
              {paisSeleccionado && `${paisSeleccionado} | `}
              {universidadSeleccionado && `${universidadSeleccionado} | `}
              {carreraSeleccionado && `${carreraSeleccionado} | `}
              {clasificacionSeleccionada && `${clasificacionSeleccionada} | `}
              {fechaSeleccionada && `${fechaSeleccionada} | `}
              {modalidadSeleccionada && `${modalidadSeleccionada}`}
            </Text>
            <View className='justify-center items-end text-center'>
              <TouchableOpacity onPress={() => reiniciarFiltros()}>
                <Feather name="x" size={12} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>


      <FlatList
        data={datosFiltrados}
        keyExtractor={(item) => item.usuario_id?.toString()}
        className="rounded-lg"
        renderItem={({ item }) => <CardProfesor datos={item} />}
        ListEmptyComponent={(
          <View className="flex-1 items-center justify-center mt-10">
            <Ionicons name="school-outline" size={64} color="rgba(255,255,255,0.5)" />
            <Text className="text-center text-white text-lg font-medium mt-4">
              No se encontraron tutorías
            </Text>
            <Text className="text-center text-white opacity-70 mt-2 px-8 mb-4">
              Intenta con otros criterios de búsqueda o ajusta los filtros aplicados.
            </Text>
          </View>
        )}
      />


      <Modal visible={mostrarModalFiltro} animationType="fade" transparent>
        <View className="flex-1 items-center justify-center bg-black/80">
          <View className="max-h-[90vh] w-96 rounded-lg bg-[#0B4C6D] p-6">

            <TouchableOpacity
              className="absolute top-2 right-4 p-2 z-10"
              onPress={() => setMostrarModalFiltro(false)}
            >
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
            <ScrollView className="max-h-[80vh] mt-8">
              <TouchableOpacity
                className="flex-row items-center justify-between rounded-lg bg-[#2D81AD] p-3"
                onPress={() => setMostrarPaises(!mostrarPaises)}>
                <View className="flex-row items-center">
                  <Fontisto name="world-o" size={12} color="white" className="mr-4" />
                  <Text className="font-bold text-white">País</Text>
                </View>
                <MaterialIcons
                  name={mostrarPaises ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={16}
                  color="white"
                />
              </TouchableOpacity>


              {mostrarPaises && (
                <View className="mt-2 rounded-lg bg-[#c2e4f4] p-2">
                  {loading ? (
                    <Text className="text-[#023146]">Cargando países...</Text>
                  ) : paisesArray.length > 0 ? (
                    paisesArray.map((pais) => (
                      <TouchableOpacity
                        key={pais.value.toString()}
                        onPress={() => seleccionPais(pais.label)}
                        className="mb-2 flex-row items-center">
                        <View
                          className={`h-5 w-5 rounded border border-gray-500 ${paisSeleccionado === pais.label ? 'bg-[#2D81AD]' : 'border-gray-500'}`}
                        />
                        <Text className="ml-2 text-[#023146]">{pais.label}</Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text className="text-[#023146]">No hay países disponibles</Text>
                  )}
                </View>
              )}


              <TouchableOpacity
                className="mt-5 flex-row items-center justify-between rounded-lg bg-[#2D81AD] p-3"
                onPress={() => setMostrarUniversidad(!mostrarUniversidad)}>
                <View className="flex-row items-center">
                  <FontAwesome name="university" size={12} color="white" className="mr-4" />
                  <Text className="font-bold text-white">Universidad</Text>
                </View>
                <MaterialIcons
                  name={mostrarUniversidad ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={16}
                  color="white"
                />
              </TouchableOpacity>

              {mostrarUniversidad && (
                <View className="mt-2 rounded-lg bg-[#c2e4f4] p-2">
                  {loading ? (
                    <Text className="text-[#023146]">Cargando universidades...</Text>
                  ) : universidadesArray.length > 0 ? (
                    universidadesArray.map((uni) => (
                      <TouchableOpacity
                        key={uni.value.toString()}
                        onPress={() => seleccionUniversidad(uni.label)}
                        className="mb-2 flex-row items-center">
                        <View
                          className={`h-5 w-5 rounded border border-gray-500 ${universidadSeleccionado === uni.label ? 'bg-[#2D81AD]' : 'border-gray-500'}`}
                        />
                        <Text className="ml-2 text-[#023146]">{uni.label}</Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text className="text-[#023146]">
                      {paisSeleccionado ? "No hay universidades para el país seleccionado" : "Selecciona un país primero"}
                    </Text>
                  )}
                </View>
              )}

              <TouchableOpacity
                className="mt-5 flex-row items-center justify-between rounded-lg bg-[#2D81AD] p-3"
                onPress={() => setMostrarcarrera(!mostrarcarrera)}>
                <View className="flex-row items-center">
                  <FontAwesome name="address-book" size={12} color="white" className="mr-4" />
                  <Text className="font-bold text-white">Carrera</Text>
                </View>
                <MaterialIcons
                  name={mostrarcarrera ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={16}
                  color="white"
                />
              </TouchableOpacity>

              {mostrarcarrera && (
                <View className="mt-2 rounded-lg bg-[#c2e4f4] p-2">
                  {loading ? (
                    <Text className="text-[#023146]">Cargando carreras...</Text>
                  ) : carrerasArray.length > 0 ? (
                    carrerasArray.map((carrer) => (
                      <TouchableOpacity
                        key={carrer.value.toString()}
                        onPress={() => seleccionCarrera(carrer.label)}
                        className="mb-2 flex-row items-center">
                        <View
                          className={`h-5 w-5 rounded border border-gray-500 ${carreraSeleccionado === carrer.label ? 'bg-[#2D81AD]' : 'border-gray-500'}`}
                        />
                        <Text className="ml-2 text-[#023146]">{carrer.label}</Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text className="text-[#023146]">
                      {universidadSeleccionado ? "No hay carreras para la universidad seleccionada" : "Selecciona una universidad primero"}
                    </Text>
                  )}
                </View>
              )}

              <TouchableOpacity
                className="mt-5 flex-row items-center justify-between rounded-lg bg-[#2D81AD] p-3"
                onPress={() => setMostrarClasificacion(!mostrarclasificacion)}>
                <View className="flex-row items-center">
                  <FontAwesome name="chalkboard-teacher" size={12} color="white" className="mr-4" />
                  <Text className="font-bold text-white">Clasificación</Text>
                </View>
                <MaterialIcons
                  name={mostrarclasificacion ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={16}
                  color="white"
                />
              </TouchableOpacity>

              {mostrarclasificacion && (
                <View className="mt-2 rounded-lg bg-[#c2e4f4] p-2">
                  {loadingClasificaciones ? (
                    <Text className="text-[#023146]">Cargando clasificaciones...</Text>
                  ) : classifications.length > 0 ? (
                    classifications.map((clasif, index) => (
                      clasif && clasif.value ? (
                        <TouchableOpacity
                          key={clasif.value.toString()}
                          onPress={() => seleccionaMateria(clasif.label)}
                          className="mb-2 flex-row items-center"
                        >
                          <View
                            className={`h-5 w-5 rounded border border-gray-500 ${clasificacionSeleccionada === clasif.label ? 'bg-[#2D81AD]' : 'border-gray-500'}`}
                          />
                          <Text className="ml-2 text-[#023146]">{clasif.label}</Text>
                        </TouchableOpacity>
                      ) : (
                        <Text key={`clasif-${index}`} className="text-[#023146]">Clasificación inválida</Text>
                      )
                    ))
                  ) : (
                    <Text className="text-[#023146]">No hay clasificaciones disponibles</Text>
                  )}
                </View>
              )}

              <TouchableOpacity
                className="mt-5 flex-row items-center justify-between rounded-lg bg-[#2D81AD] p-3"
                onPress={() => setMostrarFecha(!mostrarFecha)}>
                <View className="flex-row items-center">
                  <FontAwesome name="calendar" size={12} color="white" className="mr-4" />
                  <Text className="font-bold text-white">Fecha</Text>
                </View>
                <MaterialIcons
                  name={mostrarFecha ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={16}
                  color="white"
                />
              </TouchableOpacity>

              {mostrarFecha && (
                <View className="mt-2 rounded-lg bg-[#c2e4f4] p-2">
                  {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(
                    (fech) => (
                      <TouchableOpacity
                        key={fech}
                        onPress={() => seleccionaFecha(fech)}
                        className="mb-2 flex-row items-center">
                        <View
                          className={`h-5 w-5 rounded border border-gray-500 ${fechaSeleccionada === fech ? 'bg-[#2D81AD]' : 'border-gray-500'}`}
                        />
                        <Text className="ml-2 text-[#023146]">{fech}</Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              )}

              <TouchableOpacity
                className="mt-5 flex-row items-center justify-between rounded-lg bg-[#2D81AD] p-3"
                onPress={() => setMostrarModalidad(!mostrarModalidad)}>
                <View className="flex-row items-center">
                  <FontAwesome name="book-reader" size={12} color="white" className="mr-4" />
                  <Text className="font-bold text-white">Modalidad</Text>
                </View>
                <MaterialIcons
                  name={mostrarModalidad ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={16}
                  color="white"
                />
              </TouchableOpacity>

              {mostrarModalidad && (
                <View className="mt-2 rounded-lg bg-[#c2e4f4] p-2">
                  {['virtual', 'presencial', 'híbrida'].map((mod) => (
                    <TouchableOpacity
                      key={mod}
                      onPress={() => seleccionaModalidad(mod)}
                      className="mb-2 flex-row items-center">
                      <View
                        className={`h-5 w-5 rounded border border-gray-500 ${modalidadSeleccionada === mod ? 'bg-[#2D81AD]' : 'border-gray-500'}`}
                      />
                      <Text className="ml-2 text-[#023146]">{mod}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </ScrollView>

            <TouchableOpacity
              className="mt-4 rounded bg-[#FB8500] p-2"
              onPress={() => setMostrarModalFiltro(false)}>
              <Text className="text-center text-white">Aplicar Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}