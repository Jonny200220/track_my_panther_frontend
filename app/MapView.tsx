import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Simulamos un componente de mapa
const Map = ({ children }) => (
  <View style={styles.map}>
    {children}
  </View>
);

export default function TruckMapScreen({ route, navigation }) {
  const { truck } = route.params;
  const [location, setLocation] = useState({ lat: 19.4326, lng: -99.1332 }); // Coordenadas de CDMX

  useEffect(() => {
    // Aquí normalmente obtendrías la ubicación real del camión
    const interval = setInterval(() => {
      setLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.01,
        lng: prev.lng + (Math.random() - 0.5) * 0.01
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" size={24} color="#007AFF" />
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{truck.name}</Text>
      <Text style={styles.subtitle}>Placa: {truck.plate}</Text>
      <Map>
        <View style={styles.mapPin}>
          <Feather name="map-pin" size={32} color="#FF3B30" />
        </View>
        <Text style={styles.mapText}>Ubicación actual</Text>
        <Text style={styles.mapCoords}>
          Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
        </Text>
      </Map>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Información del viaje</Text>
        <Text style={styles.infoText}>Última actualización: {new Date().toLocaleTimeString()}</Text>
        <Text style={styles.infoText}>Velocidad: 60 km/h</Text>
        <Text style={styles.infoText}>Destino: {truck.lastLocation}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  map: {
    height: 300,
    backgroundColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  mapPin: {
    marginBottom: 8,
  },
  mapText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mapCoords: {
    fontSize: 14,
    color: '#666',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
});