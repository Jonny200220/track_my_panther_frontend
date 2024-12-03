import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const trucks = [
  { id: '1', name: 'Camión 3', plate: 'GHI-789', lastLocation: 'Monterrey' },
  { id: '2', name: 'Camión 4', plate: 'JKL-012', lastLocation: 'Puebla' },
];

export default function TruckSelectionScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTrucks = trucks.filter(truck =>
    truck.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    truck.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTruckItem = ({ item }) => (
    <TouchableOpacity
      style={styles.truckItem}
      onPress={() => navigation.navigate('TruckMap', { truck: item })}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View style={styles.truckInfo}>
        <Text style={styles.truckName}>{item.name}</Text>
        <Text style={styles.truckPlate}>{item.plate}</Text>
        <Text style={styles.truckLocation}>Última ubicación: {item.lastLocation}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Seleccionar Camión</Text>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#6C757D" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre o placa"
          placeholderTextColor="#6C757D"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <FlatList
        data={filteredTrucks}
        renderItem={renderTruckItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Fondo gris claro
    padding: 16,
  },
  title: {
    // marginVertical: 50,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D3557', // Azul profundo
    marginBottom: 16,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF', // Blanco
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Sombra en Android
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#1D3557', // Texto azul profundo
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  truckItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF', // Blanco para tarjetas
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1, // Sombra para Android
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#A8DADC', // Azul claro
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#1D3557', // Azul profundo
    fontSize: 18,
    fontWeight: 'bold',
  },
  truckInfo: {
    flex: 1,
  },
  truckName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D3557', // Azul profundo
  },
  truckPlate: {
    fontSize: 14,
    color: '#6C757D', // Texto gris oscuro
  },
  truckLocation: {
    fontSize: 12,
    color: '#6C757D', // Texto gris oscuro
  },
});
