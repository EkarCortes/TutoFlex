import React from 'react';
import { Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/app/contexts/AuthContext';
import QuickAccessButton from '../../components/QuickAccessButton';

const { width } = Dimensions.get("window");

export default function renderQuickAccessButtons() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    // Se puede poner un loader o nada mientras se carga el usuario
    return null;
  }

  const userRole = user.rol_id;

  if (userRole === 1) {
    return (
      <>
        <QuickAccessButton
          iconName="book"
          label1="Gestionar"
          label2="Cursos"
          onPress={() => router.push('../(drawer)/manageCourses')}
        />
        <QuickAccessButton
          iconName="confirmation-number"
          label1="Lista de"
          label2="Cupones"
          onPress={() => router.push('../(drawer)/coupons')}
        />
      </>
    );
  } else if (userRole === 3) {
    return (
      <>
        <QuickAccessButton
          iconName="class"
          label1="Agregar"
          label2="Cursos"
          onPress={() => router.push('../(drawer)/course')}
        />
     
        <QuickAccessButton
          iconName="monetization-on"
          label1="Pagos"
          label2="Recibidos"
          onPress={() => router.push('../(drawer)/receivedPayments')}
        />
        <QuickAccessButton
          iconName="assignment"
          label1="Tutorias"
          label2="Pendientes"
          onPress={() => router.push('../(drawer)/profesorTutorials')}
        />
           <QuickAccessButton
          iconName="account-balance-wallet"
          label1="Mis"
          label2="Deducciones"
          onPress={() => router.push('../(drawer)/deductions')}
        />
      </>
    );
  } else {
    return (
      <>
       
        <QuickAccessButton
          iconName="payment"
          label1="Mis"
          label2="Pendientes"
          onPress={() => router.push('../(drawer)/payments')}
        />
        <QuickAccessButton
          iconName="school"
          label1="Reseñas"
          label2="Pendientes"
          onPress={() => router.push('../(drawer)/qualifications')}
        />
         <QuickAccessButton
          iconName="confirmation-number"
          label1="Mis"
          label2="Cupones"
          onPress={() => router.push('../(drawer)/points')}
        />
         <QuickAccessButton
          iconName="star-border"
          label1="Mis"
          label2="Puntos"
          onPress={() => router.push('../(drawer)/points')}
        />
      </>
    );
  }
}


