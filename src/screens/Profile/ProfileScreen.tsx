import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
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
  
  // Exemple de gestion des actions de navigation (ici, juste des logs)
  const handlePress = (option) => {
    console.log(`Action pour "${option}" déclenchée.`);
    // Ici, vous utiliseriez navigation.navigate('NomDeLaPage')
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER: Image de profil et informations */}
      <View style={styles.profileHeader}>
        <Image
          source={require('../../../assets/images/man.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john.doe@example.com</Text>
      </View>

      {/* Apparence (Menu déroulant simulé) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Apparence</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedAppearance}
            onValueChange={(itemValue) => setSelectedAppearance(itemValue)}
            style={styles.picker}
            dropdownIconColor={theme.colors.primary}
          >
            <Picker.Item label="Clair" value="light" />
            <Picker.Item label="Sombre" value="dark" />
            <Picker.Item label="Système" value="system" />
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
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background, // Assurez-vous que le background est dans votre thème
  },
  profileHeader: {
    alignItems: 'center',
    padding: theme.spacing.lg, // Ajusté pour correspondre à votre thème
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border, // Assurez-vous que le border est dans votre thème
    marginBottom: theme.spacing.md,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: theme.spacing.sm,
  },
  profileName: {
    fontSize: theme.fontSize.large, // Ajusté pour correspondre à votre thème
    fontWeight: 'bold',
    color: theme.colors.text, // Assurez-vous que le text est dans votre thème
  },
  profileEmail: {
    fontSize: theme.fontSize.normal, // Ajusté pour correspondre à votre thème
    color: theme.colors.textLight, // Assurez-vous que le textLight est dans votre thème
  },
  section: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.normal, // Ajusté pour correspondre à votre thème
    fontWeight: 'bold',
    color: theme.colors.text,
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
    borderBottomColor: theme.colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: theme.spacing.md,
    fontSize: theme.fontSize.normal, // Ajusté pour correspondre à votre thème
    color: theme.colors.text,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm, // Ajusté pour correspondre à votre thème
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  picker: {
    height: 50,
    width: '100%',
    color: theme.colors.text,
  },
  logoutButton: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm, // Ajusté pour correspondre à votre thème
    alignItems: 'center',
    margin: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  logoutText: {
    color: theme.colors.danger, // Assurez-vous que le danger est dans votre thème
    fontSize: theme.fontSize.large, // Ajusté pour correspondre à votre thème
    fontWeight: 'bold',
  },
});

export default ProfileScreen;