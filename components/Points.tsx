import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import usePoints from "../hooks/points/usePoints";

const Points = () => {
    const { selectedTab, profile, handleTabChange } = usePoints();

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#023046" }}>
            <View style={{ padding: 20 }}>
                {/* Imagen del perfil */}
                <View style={{ alignItems: "center", marginBottom: 20 }}>
                    <Image
                        source={require("../assets/images/people-2.jpeg")}
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 60,
                            borderWidth: 3,
                            borderColor: "#FEB702",
                        }}
                    />
                </View>

                {/* Puntos acumulados */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 20,
                        backgroundColor: "#086490",
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 15,
                    }}
                >
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", marginRight: 5 }}>
                        Puntos: {profile?.total_puntos ?? "0"}
                    </Text>
                    <MaterialIcons name="star-border" size={22} color="#FEB702" />
                </View>

                {/* Tabs de navegación */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: selectedTab === "Funcionamiento" ? "#FB8500" : "#1C4E80",
                            paddingVertical: 12,
                            width: "48%",
                            borderRadius: 10,
                            alignItems: "center",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                        onPress={() => handleTabChange("Funcionamiento")}
                    >
                        <Text style={{ color: "white", fontWeight: "bold" }}>Funcionamiento</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: selectedTab === "Aplicar" ? "#FB8500" : "#1C4E80",
                            paddingVertical: 12,
                            width: "48%",
                            borderRadius: 10,
                            alignItems: "center",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                        onPress={() => handleTabChange("Aplicar")}
                    >
                        <Text style={{ color: "white", fontWeight: "bold" }}>Aplicar</Text>
                    </TouchableOpacity>
                </View>

                {/* Contenido de los tabs */}
                {selectedTab === "Funcionamiento" ? (
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 20,
                            borderRadius: 15,
                            marginBottom: 20,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", color: "#023046" }}>
                            Cómo funciona
                        </Text>
                        <Text style={{ marginTop: 10, fontSize: 14, color: "#023046", lineHeight: 22 }}>
                            - Se otorgan automáticamente 200 cuando se registra por primera vez.{"\n\n"}
                            - Cada vez que pagues por una tutoría, se sumarán 50 puntos a tu perfil. Podrás verlos reflejados en esta
                            pantalla o en tu perfil de estudiante.{"\n\n"}
                            - Existe un ranking de puntos donde competirás con otros estudiantes y podrás recibir recompensas, como
                            descuentos en los pagos de tutorías.{"\n\n"}
                            - Cuantas más horas de tutorías acumules, más puntos obtendrás.{"\n\n"}
                            - Los puntos acumulados aquí podrán canjearse por cupones y beneficios especiales.{"\n\n"}
                            - No afectan el ranking mensual.
                        </Text>
                    </View>
                ) : (
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 20,
                            borderRadius: 15,
                            marginBottom: 20,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", color: "#023046" }}>
                            Requisitos para aplicar
                        </Text>
                        <Text style={{ marginTop: 10, fontSize: 14, color: "#023046", lineHeight: 22 }}>
                            - Cuando tengas los puntos necesarios para canjearlos por cupones de descuento, estos aparecerán en el
                            apartado "Lista de cupones".{"\n\n"}
                            - Ingresa y selecciona el cupón que cumpla con los requisitos, es decir, aquel que tenga un costo en
                            puntos igual o menor a los que has acumulado.{"\n\n"}
                            - Ten en cuenta que los cupones no siempre están disponibles, por lo que es recomendable canjearlos cuanto
                            antes.{"\n\n"}
                            - Los puntos acumulados que se muestra en el ranquin no cambian hasta final de mes.{"\n\n"}
                            - Cuando finalice el mes, los puntos acumulados se reiniciarán a 0.
                        </Text>
                    </View>
                )}

                {/* Botón para ver cupones */}
                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#FB8500",
                            height: 50,
                            borderRadius: 15,
                            alignItems: "center",
                            justifyContent: "center",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 3,
                        }}
                        onPress={() => router.push("/coupons")}
                    >
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Ver cupones disponibles</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Points;