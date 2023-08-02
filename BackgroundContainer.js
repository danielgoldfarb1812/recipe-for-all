import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const BackgroundContainer = ({ children }) => {
  return (
    <ImageBackground
      source={require('./images/app_background.jpg')}
      style={styles.backgroundImage}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Adjust the image size to cover the entire screen
  },
});

export default BackgroundContainer;
