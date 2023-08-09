import React from 'react';
import { View, Text, StyleSheet, Button, Alert, Pressable } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const DrawerContent = ({ loggedInUser, handleLogout, ...props }) => {
  const showConfirmationAlert = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: handleLogout,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>Logged in as:</Text>
        <Text style={styles.drawerUsername}>{loggedInUser ? loggedInUser.Username : 'Guest'}</Text>
      </View>
      <DrawerItemList {...props} />
      {loggedInUser && (
        <View style={styles.logoutButtonContainer}>
          <Pressable style={styles.buttonDelete} onPress={showConfirmationAlert}>
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
          
        </View>
        
      )}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
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
  drawerHeader: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  drawerHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  drawerUsername: {
    fontSize: 16,
  },
  logoutButtonContainer: {
    marginHorizontal: 16,
    marginVertical: 20,
  },
});

export default DrawerContent;
