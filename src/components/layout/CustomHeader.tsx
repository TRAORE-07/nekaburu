// Top
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Platform, TouchableOpacity, ImageBackground, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

interface CustomHeaderProps {
  appName: string;
  showSearchBar?: boolean;
  onSearch?: (text: string) => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ appName, showSearchBar = true, onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (onSearch) onSearch(searchText);
  };

  const handleClearSearch = () => {
    setSearchText('');
    if (onSearch) onSearch('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../../assets/images/ingredients.jpg')}
        style={styles.headerContainer}
        resizeMode="cover"
      >
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
                  if (onSearch) onSearch(text);
                }}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={handleClearSearch}>
                  <Ionicons name="close-circle" size={20} color="#666" style={styles.clearIcon} />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 15,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    marginTop: 30,
  },
  searchIcon: {
    marginRight: 10,
  },
  clearIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default CustomHeader;