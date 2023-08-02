// HomeScreen.jsx
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import BackgroundContainer from '../BackgroundContainer';
import { ScrollView } from 'react-native-gesture-handler';
import { RecipeContext } from '../components/RecipeContext';
import RecipeCardView from '../components/RecipeCardView'; // Import the RecipeCardView component

const HomeScreen = ({ navigation }) => {
  const { recipes, setRecipes } = useContext(RecipeContext);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('https://doctorbalan.bsite.net/api/recipes');
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      setRecipes(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    filterRecipesByName();
  }, [searchQuery, recipes]);

  const filterRecipesByName = () => {
    if (!searchQuery) {
      setFilteredRecipes(recipes);
    } else {
      const formattedQuery = searchQuery.toLowerCase();
      const filtered = recipes.filter((recipe) =>
        recipe.Title.toLowerCase().includes(formattedQuery)
      );
      setFilteredRecipes(filtered);
    }
  };

  const handleCardPress = (recipe) => {
    navigation.navigate('RecipeDetails', { recipe });
  };

  return (
    <BackgroundContainer>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome!</Text>

          <TextInput
            style={styles.input}
            placeholder="Search for recipes"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <View>
            <Text style={styles.sectionTitle}>Check out our community's recipes:</Text>

            {loading ? (
              <Text>Loading...</Text>
            ) : (
              filteredRecipes.map((recipe) => (
                // Pass the navigation prop to the RecipeCardView component
                <RecipeCardView key={recipe.Id} recipe={recipe} onPress={handleCardPress} />
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </BackgroundContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    fontFamily: `sans-serif`
  },
  title: {
    fontSize: 48,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomeScreen;
