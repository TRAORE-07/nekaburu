// Defines Navigation Structure

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

// IMPORTEZ LES COMPOSANTS D'ÉCRAN ICI !
import HomeScreen from '../screens/Home/HomeScreen';
import BuyAgainScreen from '../screens/BuyAgain/BuyAgainScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
// IMPORTEZ LES TYPES DE NAVIGATION
import { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

function AppNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: 'brown', // Couleur de l'icône active
        tabBarInactiveTintColor: 'gray',  // Couleur de l'icône inactive
        tabBarStyle: {
            //borderTopWidth: 1,
            //borderTopColor: '#fff',
            // height: 60, // la hauteur de la barre
        },
        tabBarLabelStyle: {
            fontSize: 12,
            // marginBottom: 5,
        },
        // define every widget icon
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap; // Utiliser un type pour la sécurité

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'; // Icône remplie si active, contour si inactive
          } else if (route.name === 'BuyAgain') {
            iconName = focused ? 'repeat' : 'repeat-outline'; // Icône pour "Racheter"
          } else if (route.name === 'Categories') {
            iconName = focused ? 'grid' : 'grid-outline'; // Icône pour "Catégories"
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline'; // Icône pour "Profil"
          } else {
            // Un cas de repli si le nom de la route n'est pas reconnu (utile pour le débug)
            iconName = 'help-circle';
          }

          // Le composant d'icône est rendu ici
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Accueil',
        }}
      />
      <Tab.Screen
        name="BuyAgain"
        component={BuyAgainScreen}
        options={{
          title: 'Racheter',
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'Catégories',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;