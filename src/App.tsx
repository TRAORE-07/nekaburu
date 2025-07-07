// Le composant racine de l'application: initialiser l'environnement global de l'application
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './navigation/AppNavigator';
import { CartProvider } from './components/context/CartContext';
import HomeScreen from './screens/Home/HomeScreen';
import CheckoutScreen from './screens/Checkout/CheckoutScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </CartProvider>
  );
}

export default App;