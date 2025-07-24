// src/screens/BuyAgain/BuyAgainScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Added useFocusEffect
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomHeader from '../../components/layout/CustomHeader';
import ProductGrid from '../../components/layout/ProductGrid';
import { dummyBreads, dummyPastries } from '../../data/Products';
import { useCart } from '../../hooks/useCart';
import Ionicons from '@expo/vector-icons/Ionicons';
import theme from '../../styles/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const cardMargin = 10;

// Constante pour la clé de stockage AsyncStorage
const ADDED_PRODUCTS_HISTORY_KEY = 'addedProductsHistory';

type CartPopupProps = {
  itemCount: number;
  onViewCart: () => void;
  isVisible: boolean;
};

type RootStackParamList = {
  Accueil: undefined;
  Panier: undefined;
};

const CartPopup: React.FC<CartPopupProps> = ({ itemCount, onViewCart, isVisible }) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  if (!isVisible && animatedValue.__getValue() === 0) return null;

  return (
    <Animated.View style={[styles.cartPopupContainer, { transform: [{ translateY }] }]}>
      <TouchableOpacity onPress={onViewCart} style={styles.cartPopupButton}>
        <View style={styles.cartPopupContent}>
          <Text style={styles.cartPopupText}>{itemCount} Article{itemCount > 1 ? 's' : ''}</Text>
          <Text style={styles.viewCartText}>Voir le panier</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#FFF" />
      </TouchableOpacity>
    </Animated.View>
  );
};

function BuyAgainScreen(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { cart, addToCart, removeFromCart, getQuantity, totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCartPopup, setShowCartPopup] = useState(false);
  // Nouvel état pour stocker l'historique des IDs des produits ajoutés
  const [addedProductHistory, setAddedProductHistory] = useState<string[]>([]);

  // Charger l'historique des produits ajoutés depuis AsyncStorage au montage
  useEffect(() => {
    const loadAddedProductsHistory = async () => {
      try {
        const historyString = await AsyncStorage.getItem(ADDED_PRODUCTS_HISTORY_KEY);
        if (historyString) {
          setAddedProductHistory(JSON.parse(historyString));
        }
      } catch (error) {
        console.error("Failed to load added products history from AsyncStorage", error);
      }
    };
    loadAddedProductsHistory();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const updateAndSaveHistory = async () => {
        // Obtenez les IDs des produits actuellement dans le panier
        const currentCartProductIds = Object.keys(cart);
        // Créez un nouvel historique en combinant l'ancien et les nouveaux IDs uniques
        const newHistory = Array.from(new Set([...addedProductHistory, ...currentCartProductIds]));

        if (JSON.stringify(newHistory) !== JSON.stringify(addedProductHistory)) {
          setAddedProductHistory(newHistory);
          try {
            await AsyncStorage.setItem(ADDED_PRODUCTS_HISTORY_KEY, JSON.stringify(newHistory));
          } catch (error) {
            console.error("Failed to save added products history to AsyncStorage", error);
          }
        }
      };
      updateAndSaveHistory();
    }, [cart, addedProductHistory]) // Dépendances: panier actuel et l'état de l'historique
  );


  const allProducts = [...dummyBreads, ...dummyPastries];

  // Filtrer les produits pour n'afficher que ceux qui sont dans l'historique
  const productsFromHistory = allProducts.filter(product =>
    addedProductHistory.includes(product.id)
  );

  // Appliquer le filtre de recherche sur les produits de l'historique
  const filteredProducts = productsFromHistory.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBreadsInHistory = filteredProducts.filter(p => dummyBreads.some(b => b.id === p.id));
  const filteredPastriesInHistory = filteredProducts.filter(p => dummyPastries.some(pa => pa.id === p.id));

  useEffect(() => {
    setShowCartPopup(totalItems > 0);
  }, [totalItems]);

  const handleSearch = (searchText: string) => {
    setSearchQuery(searchText);
  };

  const handleViewCart = () => {
    navigation.navigate('Panier');
  };

  return (
    <View style={styles.fullScreen}>
      <CustomHeader appName="NEKABURU" onSearch={handleSearch} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.welcomeText}>
          Retrouvez ici tous les produits que vous avez déjà ajoutés à votre panier.
        </Text>

        {filteredProducts.length === 0 ? (
          <Text style={styles.noItemsText}>
            Aucun article n'a encore été ajouté à votre historique. Ajoutez des articles à votre panier pour les retrouver ici plus tard !
          </Text>
        ) : (
          <>
            {filteredBreadsInHistory.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Vos Pains Préférés</Text>
                <ProductGrid
                  products={filteredBreadsInHistory}
                  showStepper
                  onAddToCart={(id) => addToCart(id)}
                  onRemoveFromCart={(id) => removeFromCart(id)}
                  getQuantity={getQuantity}
                />
              </>
            )}

            {filteredPastriesInHistory.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Vos Pâtisseries Préférées</Text>
                <ProductGrid
                  products={filteredPastriesInHistory}
                  showStepper
                  onAddToCart={(id) => addToCart(id)}
                  onRemoveFromCart={(id) => removeFromCart(id)}
                  getQuantity={getQuantity}
                />
              </>
            )}
          </>
        )}
      </ScrollView>

      <CartPopup
        itemCount={totalItems}
        onViewCart={handleViewCart}
        isVisible={showCartPopup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainer: {
    padding: cardMargin,
    paddingBottom: theme.spacing.lg + 100, // Espace pour le popup du panier
  },
  welcomeText: {
    fontSize: theme.fontSize.normal,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.sm,
    color: theme.colors.grayDark,
    textAlign: 'center',
    width: '100%',
  },
  title: {
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    marginVertical: theme.spacing.md,
    textAlign: 'center',
    color: theme.colors.grayDark,
  },
  sectionTitle: {
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.lg, // Plus d'espace entre les sections
    color: theme.colors.grayDark,
    textAlign: 'center',
    width: '100%',
  },
  noItemsText: {
    fontSize: theme.fontSize.normal,
    color: theme.colors.grayMedium,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  cartPopupContainer: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    left: cardMargin,
    right: cardMargin,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    zIndex: 100,
  },
  cartPopupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    width: '100%',
  },
  cartPopupContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cartPopupText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.normal,
    fontWeight: 'normal',
    marginRight: theme.spacing.sm,
  },
  viewCartText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.medium,
    fontWeight: 'bold',
  },
});

export default BuyAgainScreen;