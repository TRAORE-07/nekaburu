import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import theme from '../../styles/themes';

// Composant pour chaque ligne de menu
const MenuItem = ({ title, iconName, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <Ionicons name={iconName} size={22} color={theme.colors.primary} />
      <Text style={styles.menuItemText}>{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color={theme.colors.grayMedium} />
  </TouchableOpacity>
);

function ProfileScreen(): React.JSX.Element {
  const [selectedAppearance, setSelectedAppearance] = useState('light');
  
  const handlePress = (option: string) => {
    console.log(`Action pour "${option}" déclenchée.`);
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.container}>
        {/* HEADER: Image de profil et informations */}
        <View style={styles.profileHeader}>
          <Image
            source={require('../../../assets/images/profile1.jpg')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Djeneba Traore</Text>
          <Text style={styles.profileEmail}>djeneba@gmail.com</Text>
        </View>

        {/* --- Menu Apparence --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apparence</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedAppearance}
              onValueChange={(itemValue) => setSelectedAppearance(itemValue)}
              style={styles.picker}
              dropdownIconColor={theme.colors.primary}
              dropdownIconRippleColor={theme.colors.primaryLight}
              mode={Platform.OS === 'android' ? 'dropdown' : 'dialog'} // Adapte le mode selon la plateforme
              prompt="Choisissez un thème" // Texte pour Android
            >
              <Picker.Item label="Clair" value="light" color={theme.colors.grayDark} />
              <Picker.Item label="Sombre" value="dark" color={theme.colors.grayDark} />
              <Picker.Item label="Système" value="system" color={theme.colors.grayDark} />
            </Picker>
          </View>
        </View>
        
        {/* --- Vos informations --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vos informations</Text>
          <MenuItem
            title="Vos commandes"
            iconName="receipt-outline"
            onPress={() => handlePress("Commandes")}
          />
          <MenuItem
            title="Votre liste de souhaits"
            iconName="heart-outline"
            onPress={() => handlePress("Liste de souhaits")}
          />
          <MenuItem
            title="Modes de paiement"
            iconName="card-outline"
            onPress={() => handlePress("Modes de paiement")}
          />
        </View>

        {/* --- Autres informations --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Autres informations</Text>
          <MenuItem
            title="Partager l'application"
            iconName="share-social-outline"
            onPress={() => handlePress("Partager l'application")}
          />
          <MenuItem
            title="À propos de nous"
            iconName="information-circle-outline"
            onPress={() => handlePress("À propos de nous")}
          />
          <MenuItem
            title="Compte"
            iconName="person-circle-outline"
            onPress={() => handlePress("Compte")}
          />
        </View>

        {/* Bouton de déconnexion */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => handlePress("Se déconnecter")}
        >
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// STYLES
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  paddingTop: Platform.OS === 'android' ? 25 : 0, // Ajustement pour Android
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileHeader: {
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grayLight,
    marginBottom: theme.spacing.md,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: theme.spacing.sm,
  },
  profileName: {
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    color: theme.colors.grayDark,
  },
  profileEmail: {
    fontSize: theme.fontSize.normal,
    color: theme.colors.grayMedium,
  },
  section: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.normal,
    fontWeight: 'bold',
    color: theme.colors.grayDark,
    marginLeft: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grayLight,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: theme.spacing.md,
    fontSize: theme.fontSize.normal,
    color: theme.colors.grayDark,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.grayLight,
    borderRadius: theme.borderRadius.sm,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    overflow: 'hidden',
    backgroundColor: theme.colors.background,
  },
  picker: {
    height: 50,
    width: '100%',
    color: theme.colors.grayDark,
  },
  logoutButton: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    margin: theme.spacing.md,
    marginTop: theme.spacing.lg,
    //borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  logoutText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;