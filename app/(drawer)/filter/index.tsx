import LoadingScreen from '@/components/LoadingScreen';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CardProfesor from '../../../components/CardProfesor';
import FilterSelector from '../../../components/FilterSelector';
import useProfesor from '../../../hooks/filter/useProfesor';
import useFilterTutorials from '../../../hooks/filter/useFilterTutorials';

export default function Inicio() {
  const { searchQuery } = useLocalSearchParams();
  const {
    inputKeyword,
    setInputKeyword,
    searchKeyword,
    setSearchKeyword,
    pais,
    setPais,
    universidad,
    setUniversidad,
    carrera,
    setCarrera,
    modalidad,
    setModalidad,
    clasificacion,
    setClasificacion,
    currentPage,
    setCurrentPage,
    limit,
    tutorials,
    loadingTutorials,
    total,
  } = useFilterTutorials(searchQuery || '');

  const [mostrarPaises, setMostrarPaises] = useState(false);
  const [mostrarUniversidad, setMostrarUniversidad] = useState(false);
  const [mostrarCarrera, setMostrarCarrera] = useState(false);
  const [mostrarClasificacion, setMostrarClasificacion] = useState(false);
  const [mostrarModalidad, setMostrarModalidad] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [tempPais, setTempPais] = useState<string | undefined>();
  const [tempUniversidad, setTempUniversidad] = useState<string | undefined>();
  const [tempCarrera, setTempCarrera] = useState<string | undefined>();
  const [tempClasificacion, setTempClasificacion] = useState<string | undefined>();
  const [tempModalidad, setTempModalidad] = useState<string | undefined>();

  const {
    paises,
    universidades,
    carreras,
    classifications: clasificaciones,
    modalidades,
    loading: loadingCatalogos,
    setPaisSeleccionado,
    setUniversidadSeleccionado,
  } = useProfesor();

  const handleSelectPais = (paisLabel: string) => {
    setTempPais(paisLabel);
    setPaisSeleccionado(paisLabel);
    setTempUniversidad(undefined);
    setUniversidadSeleccionado('');
    setTempCarrera(undefined);
  };
  const handleSelectUniversidad = (uniLabel: string) => {
    setTempUniversidad(uniLabel);
    setUniversidadSeleccionado(uniLabel);
    setTempCarrera(undefined);
  };
  const handleSelectCarrera = (carreraLabel: string) => {
    setTempCarrera(carreraLabel);
  };

  useEffect(() => {
    setInputKeyword(searchQuery || '');
    setSearchKeyword(searchQuery || '');
  }, [searchQuery]);

  const totalPages = Math.ceil((total || 0) / limit);

  return (
    <View className="flex-1 bg-[#082F49] p-4">
      <View className="mb-4 flex-col rounded-xl bg-[#8ECAE7] px-4 py-2">
        <View className='flex-row items-center'>
          <TextInput
            className="flex-1 text-black"
            placeholder="Buscar materia..."
            placeholderTextColor="#414962"
            value={inputKeyword}
            onChangeText={setInputKeyword}
            onSubmitEditing={() => {
              setSearchKeyword(inputKeyword);
              setCurrentPage(1);
            }}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialIcons name="filter-alt" size={24} color="#082F49" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row flex-wrap ">
        {pais && (
          <TouchableOpacity
            className="flex-row items-center bg-[#2192BC] rounded-full px-3 py-1 mr-2 mb-2"
            onPress={() => setPais(undefined)}
          >
            <Text className="text-white text-xs mr-1">País:</Text>
            <Text className="text-white text-xs font-bold mr-1">{pais}</Text>
            <MaterialIcons name="close" size={14} color="white" />
          </TouchableOpacity>
        )}
        {universidad && (
          <TouchableOpacity
            className="flex-row items-center bg-[#2192BC] rounded-full px-3 py-1 mr-2 mb-2"
            onPress={() => setUniversidad(undefined)}
          >
            <Text className="text-white text-xs mr-1">Universidad:</Text>
            <Text className="text-white text-xs font-bold mr-1">{universidad}</Text>
            <MaterialIcons name="close" size={14} color="white" />
          </TouchableOpacity>
        )}
        {carrera && (
          <TouchableOpacity
            className="flex-row items-center bg-[#2192BC] rounded-full px-3 py-1 mr-2 mb-2"
            onPress={() => setCarrera(undefined)}
          >
            <Text className="text-white text-xs mr-1">Carrera:</Text>
            <Text className="text-white text-xs font-bold mr-1">{carrera}</Text>
            <MaterialIcons name="close" size={14} color="white" />
          </TouchableOpacity>
        )}
        {clasificacion && (
          <TouchableOpacity
            className="flex-row items-center bg-[#2192BC] rounded-full px-3 py-1 mr-2 mb-2"
            onPress={() => setClasificacion(undefined)}
          >
            <Text className="text-white text-xs mr-1">Clasificación:</Text>
            <Text className="text-white text-xs font-bold mr-1">{clasificacion}</Text>
            <MaterialIcons name="close" size={14} color="white" />
          </TouchableOpacity>
        )}
        {modalidad && (
          <TouchableOpacity
            className="flex-row items-center bg-[#2192BC] rounded-full px-3 py-1 mr-2 mb-2"
            onPress={() => setModalidad(undefined)}
          >
            <Text className="text-white text-xs mr-1">Modalidad:</Text>
            <Text className="text-white text-xs font-bold mr-1">{modalidad}</Text>
            <MaterialIcons name="close" size={14} color="white" />
          </TouchableOpacity>
        )}
      </View>

      <View style={{ flex: 1, position: 'relative'  }}>
        {loadingTutorials ? (
          <LoadingScreen
            message="Cargando datos..."
            fullScreen={true}
            backgroundColor="#023047"
            indicatorColor="#FB8500"
            textColor="white"
            indicatorSize="large"
          />
        ) : (
          <FlatList
            data={tutorials}
            keyExtractor={(item) => item.tutorial_id?.toString()}
            renderItem={({ item }) => <CardProfesor datos={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 70 }} 
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
        )}

        <View
          className="flex-row justify-center items-center shadow-lg"
          style={{
            position: 'absolute',
            bottom: 18,
            left: 16,
            right: 16,
            zIndex: 10,
            backgroundColor: 'rgba(8,47,73,0.95)', 
            paddingVertical: 12,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: '#407ca5',
          }}
        >
          <TouchableOpacity
            className={`flex-row items-center px-5 py-2 mx-2 rounded-full ${currentPage <= 1 ? 'bg-[#414962]' : 'bg-[#FB8501]'}`}
            disabled={currentPage <= 1}
            activeOpacity={currentPage <= 1 ? 1 : 0.7}
            onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            <MaterialIcons name="chevron-left" size={20} color="#fff" />
            <Text className={`ml-1 text-white font-semibold ${currentPage <= 1 ? 'opacity-50' : ''}`}></Text>
          </TouchableOpacity>
          <View className="mx-2 px-4 py-2 rounded-full bg-[#407ca5]">
            <Text className="text-white font-bold text-base">
              Página {currentPage} de {totalPages || 1}
            </Text>
          </View>
          <TouchableOpacity
            className={`flex-row items-center px-5 py-2 mx-2 rounded-full ${currentPage >= totalPages ? 'bg-[#414962]' : 'bg-[#FB8501]'}`}
            disabled={currentPage >= totalPages}
            activeOpacity={currentPage >= totalPages ? 1 : 0.7}
            onPress={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          >
            <Text className={`mr-1 text-white font-semibold ${currentPage >= totalPages ? 'opacity-50' : ''}`}></Text>
            <MaterialIcons name="chevron-right" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={modalVisible}
        animationType="fade"
        transparent={true} 
        hardwareAccelerated={true} 
        presentationStyle="overFullScreen" 
        statusBarTranslucent={true} 
      >
        <View className="flex-1 items-center justify-center bg-black/80">
          <View className="max-h-[90vh] w-96 rounded-lg bg-[#0B4C6D] p-6">
            <TouchableOpacity
              className="absolute top-2 right-4 p-2 z-10"
              onPress={() => setModalVisible(false)}
            >
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
            <ScrollView className="max-h-[80vh] mt-8">
              <FilterSelector
                title="País"
                icon={<FontAwesome name="globe" size={12} color="white" className="mr-4" />}
                options={paises}
                loading={loadingCatalogos}
                expanded={mostrarPaises}
                selected={tempPais}
                onExpand={() => setMostrarPaises(!mostrarPaises)}
                onSelect={handleSelectPais}
                emptyText="No hay países disponibles"
              />
              <FilterSelector
                title="Universidad"
                icon={<FontAwesome name="university" size={12} color="white" className="mr-4" />}
                options={universidades}
                loading={loadingCatalogos}
                expanded={mostrarUniversidad}
                selected={tempUniversidad}
                onExpand={() => setMostrarUniversidad(!mostrarUniversidad)}
                onSelect={handleSelectUniversidad}
                emptyText={tempPais ? "No hay universidades para el país seleccionado" : "Selecciona un país primero"}
              />
              <FilterSelector
                title="Carrera"
                icon={<MaterialIcons name="book" size={12} color="white" className="mr-4" />}
                options={carreras}
                loading={loadingCatalogos}
                expanded={mostrarCarrera}
                selected={tempCarrera}
                onExpand={() => setMostrarCarrera(!mostrarCarrera)}
                onSelect={handleSelectCarrera}
                emptyText={tempUniversidad ? "No hay carreras para la universidad seleccionada" : "Selecciona una universidad primero"}
              />
              <FilterSelector
                title="Clasificación"
                icon={<FontAwesome name="folder" size={12} color="white" className="mr-4" />}
                options={clasificaciones}
                loading={loadingCatalogos}
                expanded={mostrarClasificacion}
                selected={tempClasificacion}
                onExpand={() => setMostrarClasificacion(!mostrarClasificacion)}
                onSelect={setTempClasificacion}
                emptyText="No hay clasificaciones disponibles"
              />
              <FilterSelector
                title="Modalidad"
                icon={<FontAwesome name="refresh" size={12} color="white" className="mr-4" />}
                options={[
                  { label: 'Virtual', value: 'virtual' },
                  { label: 'Presencial', value: 'presencial' },
                  { label: 'Híbrida', value: 'híbrida' },
                ]}
                loading={false}
                expanded={mostrarModalidad}
                selected={tempModalidad}
                onExpand={() => setMostrarModalidad(!mostrarModalidad)}
                onSelect={setTempModalidad}
              />
            </ScrollView>
            <TouchableOpacity
              className="mt-4 rounded bg-[#FB8500] p-2"
              onPress={() => {
                setPais(tempPais);
                setUniversidad(tempUniversidad);
                setCarrera(tempCarrera);
                setClasificacion(tempClasificacion);
                setModalidad(tempModalidad);
                setCurrentPage(1);
                setModalVisible(false);
              }}>
              <Text className="text-center text-white">Aplicar Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}