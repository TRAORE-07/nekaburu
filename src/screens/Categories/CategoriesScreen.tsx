// CATEGORIES SCREEN
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, Animated } from 'react-native';
import CustomHeader from '../../components/layout/CustomHeader';
import Ionicons from '@expo/vector-icons/Ionicons'; // Pour les icônes

function CategoriesScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Écran "Categories"</Text>
      {/* Ajoutez ici le contenu de votre page "Categories" */}




    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Couleur d'arrière-plan pour distinguer
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CategoriesScreen;