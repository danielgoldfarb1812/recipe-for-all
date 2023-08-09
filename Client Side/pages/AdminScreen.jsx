import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import BackgroundContainer from '../BackgroundContainer';
import * as ImagePicker from 'expo-image-picker';
import { RecipeContext } from '../components/RecipeContext';
import { Pressable } from 'react-native';

const AdminScreen = () => {
  const { recipes, setRecipes } = useContext(RecipeContext);
  const [newRecipe, setNewRecipe] = useState({
    id: '',
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    createdBy: '',
    image: null,
  });
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    fetch('https://doctorbalan.bsite.net/api/recipes')
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error(error));
  };

  const handleAddRecipe = async () => {
    try {
      const response = await fetch('https://doctorbalan.bsite.net/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Title: newRecipe.title,
          Description: newRecipe.description,
          Ingredients: newRecipe.ingredients,
          Instructions: newRecipe.instructions,
          CreatedBy: newRecipe.createdBy,
          Image: newRecipe.image,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Recipe added:', data);
        setRecipes((prevRecipes) => [...prevRecipes, data]);
        setNewRecipe({
          title: '',
          description: '',
          ingredients: '',
          instructions: '',
          createdBy: '',
          image: null,
        });
        setSelectedImageUri(null);
      } else {
        throw new Error('Error adding recipe');
      }
    } catch (error) {
      console.error(error);
      // Handle the error and show a message to the user
    }
  };

  const handleDeleteRecipe = (id) => {
    fetch(`https://doctorbalan.bsite.net/api/recipes/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Recipe deleted');
          fetchRecipes();
        } else {
          throw new Error('Failed to delete recipe');
        }
      })
      .catch((error) => {
        console.error('Error deleting recipe:', error);
      });
  };
  

  const handleSelectImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        throw new Error('Permission to access camera not granted');
      }
  
      const imageResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!imageResult.canceled) {
        setSelectedImageUri(imageResult.assets[0].uri);
        setNewRecipe({ ...newRecipe, image: imageResult.assets[0].uri });
      }
    } catch (error) {
      console.log('Error capturing image:', error);
    }
  };
  
  

  return (
    <BackgroundContainer>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>

          <Text style={styles.title}>Recipe Management App - Admin</Text>

          <Text>Add Recipe</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={newRecipe.title}
            onChangeText={(text) => setNewRecipe({ ...newRecipe, title: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={newRecipe.description}
            onChangeText={(text) => setNewRecipe({ ...newRecipe, description: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Ingredients"
            value={newRecipe.ingredients}
            onChangeText={(text) => setNewRecipe({ ...newRecipe, ingredients: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Instructions"
            value={newRecipe.instructions}
            onChangeText={(text) => setNewRecipe({ ...newRecipe, instructions: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Created By (User ID)"
            value={newRecipe.createdBy}
            onChangeText={(text) => setNewRecipe({ ...newRecipe, createdBy: text })}
          />
          <Pressable style={styles.button} onPress={handleSelectImage}>
            <Text style={styles.buttonText}>Select Image</Text>
          </Pressable>
          {/* <Button title="Select Image" onPress={handleSelectImage} /> */}
          {selectedImageUri && <Image source={{ uri: selectedImageUri }} style={{ width: 100, height: 100 }} />}
          <Pressable style={styles.button} onPress={handleAddRecipe}>
            <Text style={styles.buttonText}>Add Recipe</Text>
          </Pressable>
          {/* <Button title="Add Recipe" onPress={handleAddRecipe} /> */}

          <Text>Recipes:</Text>

          {recipes.map((recipe) => (
  <View key={recipe.Id} style={styles.recipeContainer}>
    <Image source={{ uri: recipe.Image }} style={styles.recipeImage} />
    <Text style={styles.recipeTitle}>{recipe.Title}</Text>
    <Text>{recipe.Description}</Text>
    <Text>{recipe.Ingredients}</Text>
    <Text>{recipe.Instructions}</Text>
    <Text>Created By: {recipe.CreatedBy}</Text>
    <Pressable style={styles.buttonDelete} onPress={() => handleDeleteRecipe(recipe.Id)}>
      <Text style={styles.buttonText}>Delete Recipe</Text>
    </Pressable>
  </View>
))}


        </ScrollView>
      </View>
    </BackgroundContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#00B81D',
  },
  buttonDelete: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
  },
  buttonText:{
    color: 'white'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  recipeContainer: {
    marginBottom: 20,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recipeImage: {
    width: 100,
    height: 100,
  },
});

export default AdminScreen;
