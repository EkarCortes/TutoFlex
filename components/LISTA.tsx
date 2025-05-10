import { View, TextInput, FlatList, ActivityIndicator, Text } from 'react-native';
import React, { useEffect } from 'react';
import CardProfesor from '../components/CardProfesor';
import useProfesor from '../hooks/filter/useProfesor';
import { Picker } from '@react-native-picker/picker';

export default function ListadoTutores() {
  const {
    datosFiltrados,
    busqueda,
    setBusqueda,
    loading,
    error,
    classifications,
    clasificacionSeleccionada,
    setClasificacionSeleccionada
  } = useProfesor();

  useEffect(() => {
    if (busqueda) {
      setBusqueda(busqueda); // Establecer la búsqueda inicial
    }
  }, [busqueda]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#2D80AD" />
        <Text className="mt-2 text-gray-600">Cargando tutorías...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-lg text-red-500">Error al cargar datos</Text>
        <Text className="mt-2 text-gray-600">No se pudieron cargar las tutorías.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className="p-4">
        <TextInput
          className="bg-gray-100 rounded-lg p-3 mb-3"
          placeholder="Buscar por curso, profesor, universidad..."
          value={busqueda}
          onChangeText={setBusqueda}
        />

        <Picker
          selectedValue={clasificacionSeleccionada}
          onValueChange={(itemValue) => setClasificacionSeleccionada(itemValue)}
          style={{ backgroundColor: '#f3f4f6', borderRadius: 8 }}
        >
          <Picker.Item label="Todas las clasificaciones" value="" />
          {classifications.map((c) => (
            <Picker.Item 
              key={c.clasificacion_id} 
              label={c.nombre} 
              value={c.nombre} 
            />
          ))}
        </Picker>
      </View>

      <FlatList
        data={datosFiltrados}
        keyExtractor={(item) => item.usuario_id?.toString() || Math.random().toString()}
        renderItem={({ item }) => <CardProfesor datos={item} />}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-8">
            <Text className="text-lg text-gray-600">No se encontraron tutorías</Text>
            <Text className="text-gray-500">Intenta con otros filtros</Text>
          </View>
        }
      />
    </View>
  );
}
