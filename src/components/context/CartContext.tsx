// src/components/context/CartContext.tsx

import React, { createContext, useState, ReactNode, useMemo } from 'react';

export interface CartState {
  [productId: string]: number;
}

export interface CartContextType {
  cart: CartState;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  getQuantity: (id: string) => number;
  clearCart: () => void;
  totalItems: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartState>({});

  const addToCart = (id: string) => {
    setCart(prev => {
      const current = prev[id] || 0;
      return { ...prev, [id]: current + 1 };
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      } else {
        return { ...prev, [id]: current - 1 };
      }
    });
  };

  const setQuantity = (id: string, quantity: number) => {
    setCart(prev => {
      if (quantity <= 0) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return { ...prev, [id]: quantity };
    });
  };

  const getQuantity = (id: string) => cart[id] || 0;

  const clearCart = () => setCart({});

  const totalItems = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, setQuantity, getQuantity, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
