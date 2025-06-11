// Le composant racine de l'application: initialiser l'environnement global de l'application
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator'; // <-- C'est votre navigateur principal

function App() {
  return (
    <NavigationContainer>
      <AppNavigator /> {/* C'est ici que votre structure de navigation est rendue */}
    </NavigationContainer>
  );
}

export default App;