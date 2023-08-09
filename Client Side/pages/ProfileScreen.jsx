// ProfileScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundContainer from '../BackgroundContainer';

const ProfileScreen = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const userJSON = await AsyncStorage.getItem('loggedInUser');
            if (userJSON) {
                const userData = JSON.parse(userJSON);
                setUser(userData);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    if (!user) {
        return (
            <View style={styles.container}>
                <Text>Loading profile...</Text>
            </View>
        );
    }

    return (
        <BackgroundContainer>

            <View style={styles.container}>
                <Text style={styles.title}>Profile Details</Text>
                <Image source={require(`../images/user_icon.jpg`)} style={styles.profileImage} />
                <Text>Username: {user.Username}</Text>
                <Text>Email: {user.Email}</Text>
                {/* Add more user profile details as needed */}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50, // Make the image circular
        marginBottom: 20,
    },
});

export default ProfileScreen;
