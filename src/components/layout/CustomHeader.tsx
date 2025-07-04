// src/components/layout/CustomHeader.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Pour gérer l'encoche des téléphones
import Ionicons from '@expo/vector-icons/Ionicons'; // Pour l'icône de recherche

const { width } = Dimensions.get('window');

interface CustomHeaderProps {
  appName: string;
  showSearchBar?: boolean;
  onSearch?: (text: string) => void; // Fonction appelée lors de la recherche
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ appName, showSearchBar = true, onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchText);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <View style={styles.content}>
          <Text style={styles.appName}>{appName}</Text>

          {showSearchBar && (
            <View style={styles.searchBarContainer}>
              <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Rechercher..."
                placeholderTextColor="#999"
                value={searchText}

                onChangeText={(text) => {
                  setSearchText(text);
                  if (onSearch) onSearch(text); // à chaque frappe
                }}

                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#DC771E',
  },
  headerContainer: {
    height: 120,
    width: '100%',
    backgroundColor: '#DC771E', // Couleur de fond unie du header
    justifyContent: 'flex-end', // Aligne le contenu vers le bas du header
    paddingBottom: 5,
  },
  content: {
    flex: 1,
    alignItems: 'flex-start', // <-- Alignement du contenu à gauche
    paddingHorizontal: 20,
    justifyContent: 'space-between', // Pour espacer le titre et la barre de recherche
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#FFF', // Couleur du texte du nom de l'application
    textShadowColor: 'rgb(0, 0, 0)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
    width: '100%', // Prend toute la largeur disponible dans le paddingHorizontal
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 10,
  },
  searchIcon: {
    marginRight: 10,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default CustomHeader;