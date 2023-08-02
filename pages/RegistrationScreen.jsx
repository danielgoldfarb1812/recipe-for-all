import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import BackgroundContainer from '../BackgroundContainer';
import { Pressable } from 'react-native';
import { UserContext } from '../components/UserContext';

const RegistrationScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [users, setUsers] = useState([]);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);
  const { refreshContext } = useContext(UserContext);
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRefresh = () => {
    refreshContext(); // Call this function to trigger the refresh
  };
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://doctorbalan.bsite.net/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    const formattedUsername = username.toLowerCase().trim();
    const formattedEmail = email.toLowerCase().trim();

    if (!formattedUsername || !formattedEmail || !password || !passwordConfirmation) {
      alert('Please fill in all fields');
      return;
    }

    // Check for username and email duplicates
    const duplicateUsername = users.find((user) => user.Username.toLowerCase() === formattedUsername);
    const duplicateEmail = users.find((user) => user.Email.toLowerCase() === formattedEmail);

    if (duplicateUsername) {
      setUsernameError(true);
      setEmailError(false);
      setPasswordError(false);
      setPasswordConfirmationError(false);
      return;
    }

    if (duplicateEmail) {
      setUsernameError(false);
      setEmailError(true);
      setPasswordError(false);
      setPasswordConfirmationError(false);
      return;
    }

    if (password !== passwordConfirmation) {
      setUsernameError(false);
      setEmailError(false);
      setPasswordError(true);
      setPasswordConfirmationError(true);
      return;
    }

    try {
      const newUser = {
        Username: formattedUsername,
        Email: formattedEmail,
        Password: password,
      };

      const response = await fetch('https://doctorbalan.bsite.net/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      handleRefresh();
      alert('Registration successful');
      // Clear the input fields on successful registration
      setUsername('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      setUsernameError(false);
      setEmailError(false);
      setPasswordError(false);
      setPasswordConfirmationError(false);
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <BackgroundContainer>

    <View style={styles.container}>
      <Text style={styles.title}>User Registration</Text>
      <TextInput
        style={[styles.input, usernameError && styles.errorInput]}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, emailError && styles.errorInput]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, passwordError && styles.errorInput]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={[styles.input, passwordConfirmationError && styles.errorInput]}
        placeholder="Confirm Password"
        secureTextEntry
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
      />
      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
      {/* <Button title="Register" onPress={handleRegister} /> */}
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
});

export default RegistrationScreen;
