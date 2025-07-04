// HOME SCREEN
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, Animated } from 'react-native';
import CustomHeader from '../../components/layout/CustomHeader';
import Ionicons from '@expo/vector-icons/Ionicons';
import { dummyBreads, dummyPastries } from '../../data/Products';
import ProductGrid from '../../components/layout/ProductGrid';


const { width } = Dimensions.get('window');
const cardMargin = 10; // Marge souhaitée entre les cartes
const cardWidth = (width - (cardMargin * 4)) / 3; // Largeur pour 3 cartes avec 4 marges


// Fonction utilitaire pour rendre les étoiles
const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Ionicons
        key={i}
        name={rating >= i ? "star" : (rating >= i - 0.5 ? "star-half" : "star-outline")}
        size={10} // Taille des étoiles réduite
        color="#FFD700" // Couleur or
        style={styles.starIcon}
      />
    );
  }
  return <View style={styles.starsContainer}>{stars}</View>;
};


interface CartPopupProps {
  itemCount: number;
  onViewCart: () => void;
  isVisible: boolean;
}

const CartPopup: React.FC<CartPopupProps> = ({ itemCount, onViewCart, isVisible }) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  if (!isVisible && animatedValue.__getValue() === 0) {
    return null;
  }

  return (
    <Animated.View style={[styles.cartPopupContainer, { transform: [{ translateY }] }]}>
      <TouchableOpacity onPress={onViewCart} style={styles.cartPopupButton}>
        <View style={styles.cartPopupContent}>
          <Text style={styles.cartPopupText}>
            {itemCount} Article{itemCount > 1 ? 's' : ''}
          </Text>
          <Text style={styles.viewCartText}>Voir le panier</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#FFF" />
      </TouchableOpacity>
    </Animated.View>
  );
};

interface CartState {
  [productId: string]: number;
}

//----------------------------------------------------

function HomeScreen(): React.JSX.Element {
  const [cart, setCart] = useState<CartState>({});
  const [showCartPopup, setShowCartPopup] = useState(false);

  const totalCartItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const filteredBreads = dummyBreads.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredPastries = dummyPastries.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );



  const updateCartItemQuantity = (productId: string, productName: string, change: number) => {
    setCart(prevCart => {
      const currentQuantity = prevCart[productId] || 0;
      const newQuantity = currentQuantity + change;

      if (newQuantity <= 0) {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      } else {
        return {
          ...prevCart,
          [productId]: newQuantity,
        };
      }
    });

    if (totalCartItems === 0 && change > 0) {
      setShowCartPopup(true);
    } else if (Object.keys(cart).length === 1 && change < 0 && (cart[productId] === 1)) {
      setShowCartPopup(false);
    } else if (totalCartItems === 0 && change === 0) {
      setShowCartPopup(false);
    } else {
      setShowCartPopup(true);
    }
  };

  const handleViewCart = () => {
    console.log('Naviguer vers la page du panier');

  };

  return (
    <View style={styles.fullScreen}>
      <CustomHeader appName="NEKABURU" onSearch={handleSearch} />

      <ScrollView contentContainerStyle={styles.contentContainer}>

        <Text style={styles.welcomeText}>Nos Pains Frais du Jour</Text>
        <ProductGrid
          products={filteredBreads}
          showStepper
          onAddToCart={(id) => updateCartItemQuantity(id, 'nom', 1)}
          onRemoveFromCart={(id) => updateCartItemQuantity(id, 'nom', -1)}
          getQuantity={(id) => cart[id] || 0}
        />



        <Text style={styles.welcomeText}>Nos Pâtisseries du Jour</Text>
        <ProductGrid
          products={filteredPastries}
          showStepper
          onAddToCart={(id) => updateCartItemQuantity(id, 'nom', 1)}
          onRemoveFromCart={(id) => updateCartItemQuantity(id, 'nom', -1)}
          getQuantity={(id) => cart[id] || 0}
        />

      </ScrollView>

      <CartPopup
        itemCount={totalCartItems}
        onViewCart={handleViewCart}
        isVisible={showCartPopup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: cardMargin,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
    width: '100%',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    //marginBottom: 20,
  },
  productCardPlaceholder: {
    backgroundColor: '#fff',
    marginBottom: cardMargin,
    borderRadius: 8,
    width: cardWidth,
    height: 205, // Hauteur augmentée pour contenir tous les détails
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
    position: 'relative', // Nécessaire pour le positionnement absolu du stepper
  },
  cardImage: {
    width: '100%',
    height: 105, // Hauteur fixe pour l'image
  },
  stepperAbsoluteContainer: {
    position: 'absolute',
    bottom: 92,
    right: 5,
    zIndex: 1,
  },
  addToCartButton: {
    backgroundColor: '#DC771E',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC771E',
    borderRadius: 5,
  },
  stepperButton: {
    padding: 5,
  },
  quantityText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  productDetailsContainer: {
    padding: 8,
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 2, // Espace sous la ligne de notation
  },
  productWeight: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 2,
    fontSize: 10,
  },
  ratingCount: {
    fontSize: 10,
    color: '#666',
    marginLeft: 4,
  },
  priceTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preparationTime: {
    fontSize: 10,
    color: '#999',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cartPopupContainer: {
    position: 'absolute',
    bottom: 20,
    left: cardMargin,
    right: cardMargin,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  cartPopupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#DC771E',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
  },
  cartPopupContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cartPopupText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'normal',
    marginRight: 10,
  },
  viewCartText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;