// HOME SCREEN
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, Animated } from 'react-native';
import CustomHeader from '../../components/layout/CustomHeader';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Product } from '../../types/Products';


const { width } = Dimensions.get('window');
const cardMargin = 10; // Marge souhaitée entre les cartes
const cardWidth = (width - (cardMargin * 4)) / 3; // Largeur pour 3 cartes avec 4 marges

// Données fictives pour les produits (avec toutes les infos, y compris rating)
const dummyBreads: Product[] = [
  { id: '1', name: 'Baguette Tradition', weight: '250g', price: '100F', rating: 4.5, ratingCount: 120, preparationTime: '10 MINS', image: require('../../../assets/img_pain/bagette.jpg') },
  { id: '2', name: 'Pain Complet', weight: '500g', price: '150F', rating: 4.0, ratingCount: 85, preparationTime: '30 MINS', image: require('../../../assets/img_pain/pain-complet.jpg') },
  { id: '3', name: 'Pain au Levain', weight: '500g', price: '175F', rating: 4.8, ratingCount: 210, preparationTime: '45 MINS', image: require('../../../assets/img_pain/pain-levain.jpg') },
  { id: '4', name: 'Pain de Campagne', weight: '500g', price: '200F', rating: 4.2, ratingCount: 150, preparationTime: '50 MINS', image: require('../../../assets/img_pain/pain-campagne.jpg') },
  { id: '5', name: 'Ciabatta', weight: '200g', price: '100F', rating: 3.9, ratingCount: 70, preparationTime: '15 MINS', image: require('../../../assets/img_pain/ciabatta.jpg') },
  { id: '6', name: 'Pain de Seigle', weight: '600g', price: '250F', rating: 4.3, ratingCount: 95, preparationTime: '40 MINS', image: require('../../../assets/img_pain/pain-seigle.jpg') },
];

const dummyPastries: Product[] = [
  { id: '7', name: 'Croissant', weight: '100g', price: '500F', rating: 4.7, ratingCount: 300, preparationTime: '8 MINS', image: require('../../../assets/img_patisserie/croissant.jpg') },
  { id: '8', name: 'Pain au Chocolat', weight: '250g', price: '600F', rating: 4.6, ratingCount: 250, preparationTime: '10 MINS', image: require('../../../assets/img_patisserie/pain-chocolat.jpg') },
  { id: '9', name: 'Chausson aux Pommes', weight: '120g', price: '300F', rating: 4.4, ratingCount: 180, preparationTime: '12 MINS', image: require('../../../assets/img_patisserie/chausson-pommes.jpg') },
  { id: '10', name: 'Brioche', weight: '300g', price: '750F', rating: 4.1, ratingCount: 100, preparationTime: '25 MINS', image: require('../../../assets/img_patisserie/brioche.jpg') },
  { id: '11', name: 'Tarte au Citron', weight: '500g', price: '1000F', rating: 4.9, ratingCount: 90, preparationTime: '15 MINS', image: require('../../../assets/img_patisserie/tarte-citron.jpg') },
  { id: '12', name: 'Éclair au Café', weight: '90g', price: '200F', rating: 4.5, ratingCount: 110, preparationTime: '7 MINS', image: require('../../../assets/img_patisserie/eclair-cafe.jpg') },
];

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
        <View style={styles.productGrid}>
          {filteredBreads.map(product => {
            const quantity = cart[product.id] || 0;
            return (
              <View key={product.id} style={styles.productCardPlaceholder}>
                <Image
                  source={product.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                {/* Stepper/Add Button positionné absolument sur l'image */}
                <View style={styles.stepperAbsoluteContainer}>
                  {quantity === 0 ? (
                    <TouchableOpacity
                      style={styles.addToCartButton}
                      onPress={() => updateCartItemQuantity(product.id, product.name, 1)}
                    >
                      <Ionicons name="add" size={18} color="#FFF" />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.quantityStepper}>
                      <TouchableOpacity
                        style={styles.stepperButton}
                        onPress={() => updateCartItemQuantity(product.id, product.name, -1)}
                      >
                        <Ionicons name="remove" size={16} color="#FFF" />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{quantity}</Text>
                      <TouchableOpacity
                        style={styles.stepperButton}
                        onPress={() => updateCartItemQuantity(product.id, product.name, 1)}
                      >
                        <Ionicons name="add" size={18} color="#FFF" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {/* Conteneur pour le reste des détails du produit */}
                <View style={styles.productDetailsContainer}>
                  <Text style={styles.productWeight}>{product.weight}</Text> {/* Poids en premier */}
                  <Text style={styles.productName}>{product.name}</Text> {/* Titre en second */}

                  <View style={styles.ratingRow}>
                    {renderStars(product.rating)}
                    <Text style={styles.ratingCount}>({product.ratingCount})</Text>
                  </View>

                  <View style={styles.priceTimeRow}>
                    <Text style={styles.preparationTime}>{product.preparationTime}</Text>
                    <Text style={styles.productPrice}>{product.price}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <Text style={styles.welcomeText}>Nos Pâtisseries du Jour</Text>
        <View style={styles.productGrid}>
          {filteredPastries.map(product => {
            const quantity = cart[product.id] || 0;
            return (
              <View key={product.id} style={styles.productCardPlaceholder}>
                <Image
                  source={product.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                {/* Stepper/Add Button positionné absolument sur l'image */}
                <View style={styles.stepperAbsoluteContainer}>
                  {quantity === 0 ? (
                    <TouchableOpacity
                      style={styles.addToCartButton}
                      onPress={() => updateCartItemQuantity(product.id, product.name, 1)}
                    >
                      <Ionicons name="add" size={18} color="#FFF" />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.quantityStepper}>
                      <TouchableOpacity
                        style={styles.stepperButton}
                        onPress={() => updateCartItemQuantity(product.id, product.name, -1)}
                      >
                        <Ionicons name="remove" size={16} color="#FFF" />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{quantity}</Text>
                      <TouchableOpacity
                        style={styles.stepperButton}
                        onPress={() => updateCartItemQuantity(product.id, product.name, 1)}
                      >
                        <Ionicons name="add" size={18} color="#FFF" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {/* Conteneur pour le reste des détails du produit */}
                <View style={styles.productDetailsContainer}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productWeight}>{product.weight}</Text>

                  <View style={styles.ratingRow}>
                    {renderStars(product.rating)}
                    <Text style={styles.ratingCount}>({product.ratingCount})</Text>
                  </View>

                  <View style={styles.priceTimeRow}>
                    <Text style={styles.preparationTime}>{product.preparationTime}</Text>
                    <Text style={styles.productPrice}>{product.price}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

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