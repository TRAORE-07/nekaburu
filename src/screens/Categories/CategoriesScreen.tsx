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


const CategoriesScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCartPopup, setShowCartPopup] = useState(false);
  
  const { cart, addToCart, removeFromCart, getQuantity, totalItems } = useCart();

  const allProducts = [...dummyBreads, ...dummyPastries];

  const sucrés = allProducts.filter(p => p.type === 'Sucré');
  const salés = allProducts.filter(p => p.type === 'Salé');
  const neutres = allProducts.filter(p => p.type === 'Neutre');
  const légAcidulés = allProducts.filter(p => p.type === 'Légèrement acidulé');
  const acidulés = allProducts.filter(p => p.type === 'Acidulé');

  useEffect(() => {
      setShowCartPopup(totalItems > 0);
    }, [totalItems]);

  return (
    <View style={styles.container}>
      <CustomHeader appName="NEKABURU" onSearch={setSearchQuery} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Produits Sucrés</Text>
        <ProductGrid
          products={sucrés}
          showStepper
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          getQuantity={getQuantity}
        />

        <Text style={styles.title}>Produits Salés</Text>
        <ProductGrid
          products={salés}
          showStepper
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          getQuantity={getQuantity}
        />

        <Text style={styles.title}>Produits Neutres</Text>
        <ProductGrid
          products={neutres}
          showStepper
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          getQuantity={getQuantity}
        />

        {légAcidulés.length > 0 && (
          <>
            <Text style={styles.title}>Légèrement Acidulés</Text>
            <ProductGrid
              products={légAcidulés}
              showStepper
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              getQuantity={getQuantity}
            />
          </>
        )}

        {acidulés.length > 0 && (
          <>
            <Text style={styles.title}>Produits Acidulés</Text>
            <ProductGrid
              products={acidulés}
              showStepper
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              getQuantity={getQuantity}
            />
          </>
        )}

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
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#333',
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

export default CategoriesScreen;
