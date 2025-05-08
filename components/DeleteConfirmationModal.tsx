import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

interface DeleteConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  message = "¿Estás seguro de que deseas eliminar este curso?",
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-lg p-6 w-4/5">
          <Text className="text-lg font-bold text-center mb-4">{message}</Text>
          <Text className="text-gray-700 text-center mb-4">
            Al confirmar, se eliminarán el precio, la modalidad y los horarios establecidos para este curso.
          </Text>
          <View className="flex-row justify-around">
            <TouchableOpacity
              onPress={onClose}
              className="bg-gray-300 px-4 py-2 rounded-lg"
            >
              <Text className="text-black">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              className="bg-red-500 px-4 py-2 rounded-lg"
            >
              <Text className="text-white">Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmationModal;