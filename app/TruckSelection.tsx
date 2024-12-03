import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  BusSelection: undefined;
  BusMap: { bus: Bus };
};

type Props = NativeStackScreenProps<RootStackParamList, 'BusSelection'>;

type Bus = {
  id: string;
  name: string;
  plate: string;
  route: string;
};

const buses: Bus[] = [
  { id: '1', name: 'Autobús 1', plate: 'ABC-123', route: 'Ruta Escolar A' },
  { id: '2', name: 'Autobús 2', plate: 'DEF-456', route: 'Ruta Escolar B' },
];

export default function BusSelectionScreen({ navigation }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBuses = buses.filter(
    bus =>
      bus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderBusItem = ({ item }: { item: Bus }) => (
    <TouchableOpacity
      style={styles.busItem}
      onPress={() => navigation.navigate('BusMap', { bus: item })}
    >
      <View style={styles.iconContainer}>
        <FontAwesome name="bus" size={24} color="#1D3557" />
      </View>
      <View style={styles.busInfo}>
        <Text style={styles.busName}>{item.name}</Text>
        <Text style={styles.busPlate}>{item.plate}</Text>
        <Text style={styles.busRoute}>Ruta: {item.route}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Seleccionar Autobús</Text>
      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={20}
          color="#6C757D"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre o placa"
          placeholderTextColor="#6C757D"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <FlatList
        data={filteredBuses}
        renderItem={renderBusItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#1D3557',
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  busItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#A8DADC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  busInfo: {
    flex: 1,
  },
  busName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D3557',
  },
  busPlate: {
    fontSize: 14,
    color: '#6C757D',
  },
  busRoute: {
    fontSize: 12,
    color: '#6C757D',
  },
});
