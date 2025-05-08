import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

type Props = {
    modalVisible: boolean;
    handleCancel: () => void;
    handleSave: () => void;
    children?: React.ReactNode;
};

const EditProfileModal = ({ modalVisible, handleCancel, handleSave, children }: Props) => {
    return (
        <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={handleCancel}>
            <View className="flex-1 justify-center items-center bg-black/80">
                <View className="bg-[#023047] w-11/12 max-w-md rounded-xl p-4 shadow-lg">
                    <Text className="text-white text-2xl font-bold text-center mb-4">Editar Perfil</Text>
                    {children}
                    <View className="flex-row justify-between">
                        <TouchableOpacity className="bg-[#0B4D6C] py-3 px-6 rounded-lg w-5/12" onPress={handleCancel}>
                            <Text className="text-white text-center font-medium">Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-[#FB8500] py-3 px-6 rounded-lg w-5/12" onPress={handleSave}>
                            <Text className="text-white text-center font-medium">Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default EditProfileModal;
