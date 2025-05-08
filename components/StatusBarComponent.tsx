import React from 'react';
import { StatusBar } from 'expo-status-bar';


const StatusBarComponent = () => {
  return (
    <StatusBar 
      style="light"
      backgroundColor="#086491" 
      translucent={true} 
    />
  );
};

export default StatusBarComponent;