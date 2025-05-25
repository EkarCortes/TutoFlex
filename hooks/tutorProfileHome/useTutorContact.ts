import { Linking } from "react-native";

// Este hook se utiliza para manejar la lógica de contacto del tutor

export function useTutorContact(tutor: any) {
  const handleContactWhatsApp = () => {
    if (tutor?.telefono_profesor) {
      const url = `https://wa.me/+506${tutor.telefono_profesor.replace(/[^0-9]/g, '')}`;
      Linking.openURL(url).catch(err =>
        console.error('Error al abrir WhatsApp:', err)
      );
    }
  };
  return { handleContactWhatsApp };
}