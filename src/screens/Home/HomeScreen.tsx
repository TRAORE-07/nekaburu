// HOME SCREEN
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import CustomHeader from '../../components/layout/CustomHeader'; // Header

// Obtenir la largeur de l'écran pour un calcul de taille réactif
const { width } = Dimensions.get('window');
const cardMargin = 10; // Marge souhaitée entre les cartes
const cardWidth = (width - (cardMargin * 3)) / 2; // Largeur pour 2 cartes avec 3 marges (gauche, centre, droite)

// Données fictives pour les produits (remplacez par vos données réelles plus tard)
const dummyBreads = [
  { id: '1', name: 'Baguette Tradition', image: require('../../../assets/images/bagette.jpg') },
  { id: '2', name: 'Pain Complet', image: require('../../../assets/images/pain-complet.jpg') },
];

const dummyPastries = [
  { id: '3', name: 'Croissant', image: require('../../../assets/images/croissant.jpg') },
  { id: '4', name: 'Pain au Chocolat', image: require('../../../assets/images/pain-chocolat.jpg') },
];


function HomeScreen(): React.JSX.Element {
  const handleSearch = (searchText: string) => {
    console.log('Recherche lancée sur l’accueil pour:', searchText);
    // implémenter la logique de recherche
  };

  return (
    <View style={styles.fullScreen}> {/* Un conteneur qui prend tout l'écran */}
      <CustomHeader appName="NEKABURU" onSearch={handleSearch} /> {/* Utilisez l'en-tête */}

      <ScrollView contentContainerStyle={styles.contentContainer}>

        <Text style={styles.welcomeText}>Nos Pains Frais du Jour</Text>
        {/* Conteneur pour les cartes de pain */}
        <View style={styles.productGrid}>
          {dummyBreads.map(product => (
            <View key={product.id} style={styles.productCardPlaceholder}>
              <Image
                source={product.image}
                style={styles.cardImage}
                resizeMode="cover" // L'image couvrira l'espace alloué, peut être rognée
              />
              <Text style={styles.cardTitle}>{product.name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.welcomeText}>Nos Pâtisseries du Jour</Text>
        {/* Conteneur pour les cartes de pâtisseries */}
        <View style={styles.productGrid}>
          {dummyPastries.map(product => (
            <View key={product.id} style={styles.productCardPlaceholder}>
              <Image
                source={product.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <Text style={styles.cardTitle}>{product.name}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: cardMargin, // Ajout d'un padding général pour la grille
    paddingBottom: 20, // Espace en bas du scroll
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
    width: '100%',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20, // Espace sous chaque grille de produits
  },
  productCardPlaceholder: {
    backgroundColor: '#f0f0f0',
    marginBottom: cardMargin,
    borderRadius: 8,
    width: cardWidth,
    height: 180, // Hauteur augmentée pour contenir l'image et le texte
    overflow: 'hidden', // Très important pour s'assurer que l'image ne dépasse pas
    // alignItems et justifyContent du parent gèrent la position des enfants
    alignItems: 'stretch', // Permet à l'image et au texte de prendre toute la largeur
    justifyContent: 'space-between', // Pousse l'image en haut et le texte en bas
    shadowColor: '#000', // Ombre pour les cartes
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  cardImage: {
    width: '100%', // 100% de la largeur du conteneur de la carte
    height: '80%', // 80% de la hauteur du conteneur de la carte
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    paddingVertical: 10,
    width: '100%',
  },
});

export default HomeScreen;