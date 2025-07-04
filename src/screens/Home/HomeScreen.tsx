// HOME SCREEN
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import CustomHeader from '../../components/layout/CustomHeader';
import ProductGrid from '../../components/layout/ProductGrid';
import { dummyBreads, dummyPastries } from '../../data/Products';
import { useCart } from '../../hooks/useCart';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const cardMargin = 10;

type CartPopupProps = {
  itemCount: number;
  onViewCart: () => void;
  isVisible: boolean;
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

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCartPopup, setShowCartPopup] = useState(false);

  const { cart, addToCart, removeFromCart, getQuantity, totalItems } = useCart();

  const filteredBreads = dummyBreads.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredPastries = dummyPastries.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setShowCartPopup(totalItems > 0);
  }, [totalItems]);

  return (
    <View style={styles.fullScreen}>
      <CustomHeader appName="NEKABURU" onSearch={setSearchQuery} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.welcomeText}>Nos Pains Frais du Jour</Text>
        <ProductGrid
          products={filteredBreads}
          showStepper
          onAddToCart={(id) => addToCart(id)}
          onRemoveFromCart={(id) => removeFromCart(id)}
          getQuantity={getQuantity}
        />

        <Text style={styles.welcomeText}>Nos Pâtisseries du Jour</Text>
        <ProductGrid
          products={filteredPastries}
          showStepper
          onAddToCart={(id) => addToCart(id)}
          onRemoveFromCart={(id) => removeFromCart(id)}
          getQuantity={getQuantity}
        />
      </ScrollView>

      <CartPopup
        itemCount={totalItems}
        onViewCart={() => console.log('Naviguer vers le panier')}
        isVisible={showCartPopup}
      />
    </View>
  );
};

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