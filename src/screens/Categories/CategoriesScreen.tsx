// CATEGORIES SCREEN
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from '../../components/layout/CustomHeader';
import Ionicons from '@expo/vector-icons/Ionicons';
import { dummyBreads, dummyPastries } from '../../data/Products';
import ProductGrid from '../../components/layout/ProductGrid';

const allProducts = [...dummyBreads, ...dummyPastries];

const sucrés = allProducts.filter(p => p.type === 'Sucré');
const salés = allProducts.filter(p => p.type === 'Salé');
const neutres = allProducts.filter(p => p.type === 'Neutre');
const acidulé = allProducts.filter(p => p.type === 'Acidulé');
const légèrement_acidulé = allProducts.filter(p => p.type === 'Légèrement acidulé');

function CategoriesScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <CustomHeader appName="NEKABURU" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Produits Sucrés</Text>
        <ProductGrid products={sucrés} />

        <Text style={styles.sectionTitle}>Produits Salés</Text>
        <ProductGrid products={salés} />

        <Text style={styles.sectionTitle}>Produits Neutres</Text>
        <ProductGrid products={neutres} />

        <Text style={styles.sectionTitle}>Produits Acidulé</Text>
        <ProductGrid products={acidulé} />

        <Text style={styles.sectionTitle}>Produits Légèrement acidulé</Text>
        <ProductGrid products={légèrement_acidulé} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#333',
  },
});

export default CategoriesScreen;
