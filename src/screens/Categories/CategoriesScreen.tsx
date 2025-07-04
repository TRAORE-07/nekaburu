import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from '../../components/layout/CustomHeader';
import ProductGrid from '../../components/layout/ProductGrid';
import { dummyBreads, dummyPastries } from '../../data/Products';

interface CartState {
  [productId: string]: number;
}

const CategoriesScreen: React.FC = () => {
  const allProducts = [...dummyBreads, ...dummyPastries];

  const sucrés = allProducts.filter(p => p.type === 'Sucré');
  const salés = allProducts.filter(p => p.type === 'Salé');
  const neutres = allProducts.filter(p => p.type === 'Neutre');
  const acidulés = allProducts.filter(p => p.type === 'Acidulé');
  const légAcidulés = allProducts.filter(p => p.type === 'Légèrement acidulé');

  // State du panier ici
  const [cart, setCart] = useState<CartState>({});

  const updateCartItemQuantity = (productId: string, change: number) => {
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
  };

  return (
    <View style={styles.container}>
      <CustomHeader appName="NEKABURU" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Produits Sucrés</Text>
        <ProductGrid
          products={sucrés}
          showStepper
          onAddToCart={(id) => updateCartItemQuantity(id, 1)}
          onRemoveFromCart={(id) => updateCartItemQuantity(id, -1)}
          getQuantity={(id) => cart[id] || 0}
        />

        <Text style={styles.title}>Produits Salés</Text>
        <ProductGrid
          products={salés}
          showStepper
          onAddToCart={(id) => updateCartItemQuantity(id, 1)}
          onRemoveFromCart={(id) => updateCartItemQuantity(id, -1)}
          getQuantity={(id) => cart[id] || 0}
        />

        <Text style={styles.title}>Produits Neutres</Text>
        <ProductGrid
          products={neutres}
          showStepper
          onAddToCart={(id) => updateCartItemQuantity(id, 1)}
          onRemoveFromCart={(id) => updateCartItemQuantity(id, -1)}
          getQuantity={(id) => cart[id] || 0}
        />

        {acidulés.length > 0 && (
          <>
            <Text style={styles.title}>Produits Acidulés</Text>
            <ProductGrid
              products={acidulés}
              showStepper
              onAddToCart={(id) => updateCartItemQuantity(id, 1)}
              onRemoveFromCart={(id) => updateCartItemQuantity(id, -1)}
              getQuantity={(id) => cart[id] || 0}
            />
          </>
        )}

        {légAcidulés.length > 0 && (
          <>
            <Text style={styles.title}>Légèrement Acidulés</Text>
            <ProductGrid
              products={légAcidulés}
              showStepper
              onAddToCart={(id) => updateCartItemQuantity(id, 1)}
              onRemoveFromCart={(id) => updateCartItemQuantity(id, -1)}
              getQuantity={(id) => cart[id] || 0}
            />
          </>
        )}
      </ScrollView>
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
});

export default CategoriesScreen;
