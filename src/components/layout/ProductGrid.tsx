import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Product } from '../../types/ProductsTypes';

const { width } = Dimensions.get('window');
const cardMargin = 10;
const cardWidth = (width - cardMargin * 4) / 3;

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <View style={styles.gridContainer}>
      {products.map((product) => (
        <View key={product.id} style={styles.card}>
          <Image source={product.image} style={styles.image} resizeMode="cover" />
          <View style={styles.details}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.weight}>{product.weight}</Text>
            <Text style={styles.price}>{product.price}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: cardWidth,
    marginBottom: cardMargin,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 100,
  },
  details: {
    padding: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#333',
  },
  weight: {
    fontSize: 12,
    color: '#666',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
  },
});

export default ProductGrid;
