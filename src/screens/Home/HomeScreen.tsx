// HOME SCREEN
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomHeader from '../../components/layout/CustomHeader';
import ProductGrid from '../../components/layout/ProductGrid';
import { dummyBreads, dummyPastries } from '../../data/Products';
import { useCart } from '../../hooks/useCart';
import Ionicons from '@expo/vector-icons/Ionicons';
import theme from '../../styles/themes';

const { width } = Dimensions.get('window');
const cardMargin = 10;

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

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
        onViewCart={() => navigation.navigate('Panier')}
        isVisible={showCartPopup}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainer: {
    padding: cardMargin,
    paddingBottom: theme.spacing.lg,
  },
  welcomeText: {
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.sm,
    color: theme.colors.grayDark,
    textAlign: 'center',
    width: '100%',
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

export default HomeScreen;