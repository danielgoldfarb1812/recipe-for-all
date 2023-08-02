import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreenComponent from './pages/LoginScreen';
import { RecipeProvider } from './components/RecipeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegistrationScreen from './pages/RegistrationScreen';
import { UserProvider } from './components/UserContext';
import DrawerContent from './components/DrawerContent'; // Import the custom drawer content
import CreateRecipeScreen from './pages/CreateRecipeScreen';
import HomeStack from './components/HomeStack';
import ProfileScreen from './pages/ProfileScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  const checkLoggedInUser = async () => {
    try {
      const userJSON = await AsyncStorage.getItem('loggedInUser');
      if (userJSON) {
        const user = JSON.parse(userJSON);
        setLoggedInUser(user);
      }
    } catch (error) {
      console.error('Error checking logged-in user from AsyncStorage:', error);
    }
  };

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loggedInUser');
      setLoggedInUser(null);
    } catch (error) {
      console.error('Error removing logged-in user from AsyncStorage:', error);
    }
  };

  return (
    <NavigationContainer>
      <UserProvider>
        <RecipeProvider>
          <Drawer.Navigator
            screenOptions={{
              headerTitle: "",
              headerShadowVisible: true,
              headerStyle: { backgroundColor: '#85a87e' },
              drawerActiveTintColor: '#ffffff',
              drawerStyle: {backgroundColor: '#85a87e'}
            }}
            initialRouteName="Home"
            drawerContent={(props) => (
              <DrawerContent {...props} loggedInUser={loggedInUser} handleLogout={handleLogout} />
            )}
          >
            {/* Use HomeStack as the component for the "Home" route */}
            <Drawer.Screen name="HomeStack" component={HomeStack} options={{ drawerLabel: 'Home' }} />

            {loggedInUser ? (
              <>
                <Drawer.Screen
                  name="Profile"
                  component={ProfileScreen}
                  options={{ drawerLabel: 'Profile' }} // Add a profile menu item
                />
                <Drawer.Screen
                  name="CreateRecipe"
                  component={CreateRecipeScreen}
                  options={{ drawerLabel: 'Create Recipe' }}
                />
              </>
            ) : (
              <>
                <Drawer.Screen
                  name="Login"
                  options={{ drawerLabel: 'Login' }}
                >
                  {(props) => <LoginScreenComponent {...props} handleLogin={handleLogin} />}
                </Drawer.Screen>
                <Drawer.Screen
                  name="Register"
                  component={RegistrationScreen}
                  options={{ drawerLabel: 'Register' }}
                />
              </>
            )}
          </Drawer.Navigator>
        </RecipeProvider>
      </UserProvider>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Your styles here
});

export default App;
