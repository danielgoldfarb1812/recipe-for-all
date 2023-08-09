import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Pressable } from 'react-native';
import { RecipeContext } from '../components/RecipeContext';
import BackgroundContainer from '../BackgroundContainer';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateRecipeScreen = ({ navigation }) => {
  const { setRecipes } = useContext(RecipeContext);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    createdBy: '', // Initialize the createdBy field to an empty string
    image: null,
  });
  const [selectedImageUri, setSelectedImageUri] = useState(null);


  useEffect(() => {
    getLoggedInUser();
  }, []);

  const getLoggedInUser = async () => {
    try {
      const loggedInUserJson = await AsyncStorage.getItem('loggedInUser');
      if (loggedInUserJson) {
        setLoggedInUser(JSON.parse(loggedInUserJson));
      }
    } catch (error) {
      console.error('Error getting logged-in user:', error);
    }
  };

  const handleAddRecipe = async () => {
    // Check if loggedInUser is available before adding the recipe
    if (loggedInUser) {
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
            CreatedBy: loggedInUser.Id,
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
            createdBy: '', // Reset the createdBy field to an empty string for the next recipe
            image: '',
          });
          navigation.goBack(); // Go back to the previous screen after adding the recipe
        } else {
          throw new Error('Error adding recipe');
        }
      } catch (error) {
        console.error(error);
        // Handle the error and show a message to the user
      }
    } else {
      console.log('User not logged in'); // You can handle this case accordingly
    }
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


  // Render only if loggedInUser is available
  if (!loggedInUser) {
    return (
      <BackgroundContainer>
        <View style={styles.container}>
          <Text style={styles.title}>Please log in to create a recipe.</Text>
          {/* You can add a Button to navigate back to the login screen */}
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
      </BackgroundContainer>
    );
  }

  return (
    <BackgroundContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Hello, {loggedInUser.Username}!</Text>
        <Text style={styles.title}>Please create a recipe.</Text>
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
          style={[styles.input, styles.multilineInput]}
          placeholder="Ingredients"
          value={newRecipe.ingredients}
          onChangeText={(text) => setNewRecipe({ ...newRecipe, ingredients: text })}
        />
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Instructions"
          value={newRecipe.instructions}
          onChangeText={(text) => setNewRecipe({ ...newRecipe, instructions: text })}
        />
        <Pressable style={styles.button} onPress={handleSelectImage}>

          <Text style={styles.buttonText}>Select Image</Text>
        </Pressable>
        {selectedImageUri && <Image source={{ uri: selectedImageUri }} style={{ width: 100, height: 100 }} />}
        <Pressable style={styles.button} onPress={handleAddRecipe} >
          <Text style={styles.buttonText}>Add Recipe</Text>
        </Pressable>
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
  buttonText:{
    color: 'white'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
  multilineInput: {
    textAlignVertical: 'top', // Start the text from the top of the input
    height: 120, // Set the height to allow enough space for multiline input
  },
});

export default CreateRecipeScreen;
