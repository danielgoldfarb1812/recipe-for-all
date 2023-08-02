// HomeStack.jsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../pages/HomeScreen';
import AdminScreen from '../pages/AdminScreen';
import RecipeDetailsScreen from '../pages/RecipeDetailsScreen'; // Import the RecipeDetailsScreen component

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} // Hide the header for the HomeScreen
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen} // Use the RecipeDetailsScreen component here
        options={{ headerShown: false }} // Hide the header for the RecipeDetailsScreen
      />
      <Stack.Screen
        name="Admin"
        component={AdminScreen}
        options={{ headerShown: false }} // Hide the header for the AdminScreen
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
