import { Redirect } from 'expo-router';
import { useAuth } from './contexts/AuthContext';
import React from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { View } from 'react-native';

export default function Index() {
  const { isAuthenticated, loading } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: "#023047" }}>
      {loading ? (
        <LoadingScreen />
      ) : (
        isAuthenticated ? <Redirect href="/(drawer)" /> : <Redirect href="/(auth)/loginScreen" />
      )}
    </View>
  );
}