import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

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
    <View style={styles.container}>
      <Text style={styles.title}>Seleccionar Camión</Text>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre o placa"
          placeholderTextColor={'gray'}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  list: {
    flex: 1,
  },
  truckItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  truckInfo: {
    flex: 1,
  },
  truckName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  truckPlate: {
    fontSize: 14,
    color: '#666',
  },
  truckLocation: {
    fontSize: 12,
    color: '#999',
  },
});