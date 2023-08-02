// RecipeCardView.jsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const RecipeCardView = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(recipe)}>
      <View style={styles.container}>
        <Text style={styles.recipeTitle}>{recipe.Title}</Text>
        <Image source={{ uri: recipe.Image }} style={styles.recipeImage} />
        <Text>{recipe.Description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'center',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default RecipeCardView;
