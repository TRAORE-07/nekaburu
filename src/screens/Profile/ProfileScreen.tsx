// src/screens/BuyAgain/BuyAgainScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

function ProfileScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/man.png')}
        style={styles.profileImage}
      />
      <Text style={styles.title}>Écran Profile</Text>
    </View>
  );
}

// STYLES COMPONENT
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default ProfileScreen;