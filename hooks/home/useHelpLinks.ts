import { Linking } from 'react-native';

export default function useHelpLinks() {
  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/50688888888');
  };
  const handleEmail = () => {
    Linking.openURL('mailto:soporte@tutoflex.com');
  };
  return { handleWhatsApp, handleEmail };
}