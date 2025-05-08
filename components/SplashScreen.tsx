import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {


  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/splash.png")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#023047",
  },
  image: {
    width: "90%", 
    height: "90%",
    resizeMode: "contain",
  },
});

export default SplashScreen;
