import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated, Easing, Platform, UIManager } from "react-native";

// Habilita LayoutAnimation en Android (opcional, pero no usado aquí)
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const InfoTeacher = ({
  tutorData,
}: {
  tutorData: {
    profesor?: string;
    curso?: string;
    modalidad?: string;
    horarios?: string;
    monto_por_hora?: string;
  } | null;
}) => {
  const [open, setOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const teacherInfo = [
    {
      icon: "account-circle",
      label: "Profesor",
      value: tutorData?.profesor || "Sin nombre",
    },
    {
      icon: "book",
      label: "Curso",
      value: tutorData?.curso || "Sin nombre",
    },
    {
      icon: "location-on",
      label: "Modalidad",
      value: tutorData?.modalidad || "Sin modalidad",
    },
    {
      icon: "access-time",
      label: "Horario",
      value: tutorData?.horarios || "Sin horario",
    },
    {
      icon: "attach-money",
      label: "Precio",
      value:
        "₡ " +
        (tutorData?.monto_por_hora
          ? Math.floor(Number(tutorData.monto_por_hora))
          : "Sin horario"),
    },
  ];

  const [contentHeight, setContentHeight] = useState(0);

  const toggleCard = () => {
    if (open) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start(() => setOpen(false));
    } else {
      setOpen(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  };

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  const animatedOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const rotateArrow = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View className="bg-[#096491] rounded-xl mb-3 shadow-md overflow-hidden">
      <TouchableOpacity
        className="flex-row justify-between items-center p-4"
        onPress={toggleCard}
        activeOpacity={0.8}
      >
        <Text className="text-xl text-white" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
          Información del Profesor
        </Text>
        <Animated.View style={{ transform: [{ rotate: rotateArrow }] }}>
          <MaterialIcons name="keyboard-arrow-down" size={28} color="#FEB602" />
        </Animated.View>
      </TouchableOpacity>
      {/* Animated.View para el contenido colapsable */}
      <Animated.View
        style={{
          height: animatedHeight,
          opacity: animatedOpacity,
          overflow: "hidden",
        }}
      >
        {/* Medimos la altura real del contenido solo una vez */}
        <View
          style={{ position: "absolute", top: 0, left: 0, right: 0, opacity: 0, zIndex: -1 }}
          pointerEvents="none"
          onLayout={e => {
            if (contentHeight === 0) setContentHeight(e.nativeEvent.layout.height);
          }}
        >
          <View className="px-4 pb-3">
            {teacherInfo.map((info, index) => (
              <View key={index} className="flex-row items-start mb-2">
                <MaterialIcons name={info.icon} size={24} color="#FEB602" style={{ marginTop: 2 }} />
                <View style={{ flex: 1 }}>
                  <Text
                    className="text-lg text-white ml-2"
                    style={{ fontFamily: "SpaceGrotesk-Bold", flexWrap: "wrap" }}
                    numberOfLines={undefined}
                  >
                    {info.label}:{" "}
                    <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{info.value}</Text>
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        {/* Contenido visible animado */}
        {open && (
          <View className="px-4 pb-3">
            {teacherInfo.map((info, index) => (
              <View key={index} className="flex-row items-start mb-2">
                <MaterialIcons name={info.icon} size={24} color="#FEB602" style={{ marginTop: 2 }} />
                <View style={{ flex: 1 }}>
                  <Text
                    className="text-lg text-white ml-2"
                    style={{ fontFamily: "SpaceGrotesk-Bold", flexWrap: "wrap" }}
                    numberOfLines={undefined}
                  >
                    {info.label}:{" "}
                    <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{info.value}</Text>
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default InfoTeacher;