import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from '../../components/layout/CustomHeader';
import ProductGrid from '../../components/layout/ProductGrid';
import { dummyBreads, dummyPastries } from '../../data/Products';
import { useCart } from '../../hooks/useCart';

const CategoriesScreen: React.FC = () => {
  const { addToCart, removeFromCart, getQuantity } = useCart();

  const allProducts = [...dummyBreads, ...dummyPastries];

  const sucrés = allProducts.filter(p => p.type === 'Sucré');
  const salés = allProducts.filter(p => p.type === 'Salé');
  const neutres = allProducts.filter(p => p.type === 'Neutre');
  const acidulés = allProducts.filter(p => p.type === 'Acidulé');
  const légAcidulés = allProducts.filter(p => p.type === 'Légèrement acidulé');

  return (
    <View style={styles.container}>
      <CustomHeader appName="NEKABURU" />

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
