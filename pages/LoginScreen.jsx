import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { UserContext } from '../components/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundContainer from '../BackgroundContainer';
import { Pressable } from 'react-native';

const LoginScreenComponent = ({ navigation, handleLogin }) => {
  const { users } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLoginPress = () => {
    setLoginError(false);
    if (username === 'ADMIN' && password === 'ADMIN'){
      navigation.navigate('Admin')
      setUsername('');
      setPassword('');
      alert('Logged in as admin');
      return;
    }
    const formattedUsername = username.toLowerCase().trim();

    // Find the user with the provided username
    const user = users.find((user) => user.Username.toLowerCase() === formattedUsername);

    if (!user || user.Password !== password) {
      setLoginError(true);
      Alert.alert('Login Failed', 'Invalid username or password');
      return;
    }

    // Store the logged-in user in AsyncStorage and update the App state
    try {
      AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
      handleLogin(user);
      // Clear input fields after successful login
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error saving logged-in user to AsyncStorage:', error);
      setLoginError(true);
      Alert.alert('Login Failed', 'Error saving user data');
    }
  };

  return (
    <BackgroundContainer>

    <View style={styles.container}>
      <Text style={styles.title}>User Login</Text>
      <TextInput
        style={[styles.input, loginError && styles.errorInput]}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, loginError && styles.errorInput]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {loginError && <Text style={styles.errorText}>Invalid username or password</Text>}
      <Pressable style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
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
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  menuButton: {
    marginTop: 10,
  },
});

export default LoginScreenComponent;
