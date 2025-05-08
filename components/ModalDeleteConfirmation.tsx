import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ModalDeleteConfirmationProps {
    title: string;
    message: string;
    itemName: string;
    isDeleting: boolean;
    onCancel: () => void;
    onDelete: () => void;
    visible: boolean; // Prop para controlar la visibilidad del modal
}

const ModalDeleteConfirmation: React.FC<ModalDeleteConfirmationProps> = ({
    title,
    message,
    itemName,
    isDeleting,
    onCancel,
    onDelete,
    visible,
}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            presentationStyle="overFullScreen"
            hardwareAccelerated={true}
            statusBarTranslucent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.7)",
                }}
            >
                <View style={{ backgroundColor: "#023046", borderRadius: 20, padding: 20, width: "90%" }}>
                    <View style={{ alignItems: "center", marginBottom: 16 }}>
                        <Ionicons name="alert-circle-outline" size={48} color="#FB8500" />
                        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", marginTop: 8, marginBottom: 4, textAlign: "center" }}>
                            {title}
                        </Text>
                        <Text style={{ color: "#B0BFCB", fontSize: 14, textAlign: "center", marginBottom: 8 }}>
                            {message}
                        </Text>
                    </View>

                    <View style={{ backgroundColor: "#01212F", padding: 12, borderRadius: 10, marginBottom: 16 }}>
                        <Text style={{ color: "white", textAlign: "center", fontWeight: "500" }}>{itemName}</Text>
                    </View>

                    <Text style={{ color: "#B0BFCB", fontSize: 12, textAlign: "center", marginBottom: 24 }}>
                        Esta acción no puede ser revertida.
                    </Text>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: "#E5E7EB",
                                padding: 12,
                                borderRadius: 10,
                                marginRight: 8,
                            }}
                            onPress={onCancel}
                            disabled={isDeleting}
                            activeOpacity={0.7}
                        >
                            <Text style={{ color: "#023047", textAlign: "center", fontWeight: "600" }}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: isDeleting ? "rgba(229, 62, 62, 0.7)" : "#E53E3E",
                                padding: 12,
                                borderRadius: 10,
                            }}
                            onPress={onDelete}
                            disabled={isDeleting}
                            activeOpacity={0.7}
                        >
                            {isDeleting ? (
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                    <ActivityIndicator size="small" color="white" />
                                    <Text style={{ color: "white", textAlign: "center", fontWeight: "600", marginLeft: 8 }}>Eliminando...</Text>
                                </View>
                            ) : (
                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                    <Ionicons name="trash-outline" size={18} color="white" />
                                    <Text style={{ color: "white", textAlign: "center", fontWeight: "600", marginLeft: 8 }}>Eliminar</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ModalDeleteConfirmation;