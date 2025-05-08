import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenWrapperProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ 
  children, 
  backgroundColor = "#023047" 
}) => {
  return (
  
      <SafeAreaView edges={['left', 'right', 'bottom']} style={[styles.safeArea, { backgroundColor }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        >
          {children}
          </KeyboardAvoidingView>
      </SafeAreaView>

  );
};

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
  }
});

export default ScreenWrapper;