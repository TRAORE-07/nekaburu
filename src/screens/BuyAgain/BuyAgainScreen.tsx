// src/screens/BuyAgain/BuyAgainScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from '../../components/layout/CustomHeader'; //Header

function BuyAgainScreen(): React.JSX.Element {
  const handleSearch = (searchText: string) => {
    console.log('Recherche lancée sur l’accueil pour:', searchText);
    // implémenterier la logique de recherche, par exemple filtrer les produits
  };

  return (
    <View style={styles.fullScreen}> {/* Un conteneur qui prend tout l'écran */}
    <CustomHeader appName="NEKABURU" onSearch={handleSearch} /> {/* Utilisez votre en-tête */}
    <View style={styles.container}>
      <Text style={styles.title}>Écran "Racheter"</Text>
      {/* Ajoutez ici le contenu de votre page "Racheter" */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#fff', // Le fond de l'écran principal
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Couleur d'arrière-plan pour distinguer
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default BuyAgainScreen;