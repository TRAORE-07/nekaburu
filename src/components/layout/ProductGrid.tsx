import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Product } from '../../types/ProductsTypes';

const { width } = Dimensions.get('window');
const cardMargin = 10;
const cardWidth = (width - cardMargin * 4) / 3;

interface ProductGridProps {
  products: Product[];
  showStepper?: boolean;
  onAddToCart?: (productId: string) => void;
  onRemoveFromCart?: (productId: string) => void;
  getQuantity?: (productId: string) => number;
}

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Ionicons
        key={i}
        name={rating >= i ? "star" : (rating >= i - 0.5 ? "star-half" : "star-outline")}
        size={10}
        color="#FFD700"
        style={{ marginRight: 2 }}
      />
    );
  }
  return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{stars}</View>;
};

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  showStepper = false,
  onAddToCart,
  onRemoveFromCart,
  getQuantity,
}) => {
  return (
    <View style={styles.productGrid}>
      {products.map(product => {
        const quantity = getQuantity ? getQuantity(product.id) : 0;

        return (
          <View key={product.id} style={styles.productCard}>
            <Image source={product.image} style={styles.cardImage} resizeMode="cover" />

            {showStepper && (
              <View style={styles.stepperAbsoluteContainer}>
                {quantity === 0 ? (
                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => onAddToCart && onAddToCart(product.id)}
                  >
                    <Ionicons name="add" size={18} color="#FFF" />
                  </TouchableOpacity>
                ) : (
                  <View style={styles.quantityStepper}>
                    <TouchableOpacity
                      style={styles.stepperButton}
                      onPress={() => onRemoveFromCart && onRemoveFromCart(product.id)}
                    >
                      <Ionicons name="remove" size={16} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity
                      style={styles.stepperButton}
                      onPress={() => onAddToCart && onAddToCart(product.id)}
                    >
                      <Ionicons name="add" size={18} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

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
  );
};

const styles = StyleSheet.create({
  /* To remember: When you use space-between on a flex container, it distributes the available space evenly between the flex items in the row. 
  It leaves no space before the first item or after the last. */
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#D3D3D3',
    marginBottom: cardMargin,
    borderRadius: 8,
    width: cardWidth,
    height: 205,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 105,
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
  productWeight: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 2,
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
});

export default ProductGrid;
