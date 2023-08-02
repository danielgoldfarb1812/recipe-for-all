// RecipeDetailsScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import BackgroundContainer from '../BackgroundContainer';

const RecipeDetailsScreen = ({ route }) => {
  const { recipe } = route.params;

  return (
    <BackgroundContainer>
      <View style={styles.container}>
        <Text style={styles.recipeTitle}>{recipe.Title}</Text>
        <Image source={{ uri: recipe.Image }} style={styles.recipeImage} />
        <Text style={styles.recipeDescription}>Description</Text>
        <Text>{recipe.Description}</Text>
        <Text style={styles.recipeDescription}>Ingredients</Text>
        <Text>{recipe.Ingredients}</Text>
        <Text style={styles.recipeDescription}>Instructions</Text>
        <Text>{recipe.Instructions}</Text>
      </View>
    </BackgroundContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeImage: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
});

export default RecipeDetailsScreen;
