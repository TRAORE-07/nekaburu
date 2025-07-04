// src/hooks/useCart.ts

import { useContext } from 'react';
import { CartContext, CartContextType } from '../components/context/CartContext';

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
