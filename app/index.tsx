import React from 'react';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const TruckIcon = () => (
  <Svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="#4C1D95" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M1 3h15v13H1z" />
    <Path d="M16 8h4l3 3v5h-7V8z" />
    <Path d="M5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
    <Path d="M18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
  </Svg>
);

export default function App() {
  const translateX = useSharedValue(0);

  React.useEffect(() => {
    translateX.value = withRepeat(
      withTiming(10, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1, // Repetir indefinidamente
      true // Reversar animación
    );
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, animatedStyle]}>
          <TruckIcon />
        </Animated.View>
        <Text style={styles.title}>Track My Panther</Text>
        <Text style={styles.subtitle}>Localiza tu camión en tiempo real</Text>
        
        <Text style={styles.description}>
          Bienvenido a la forma más fácil y rápida de rastrear la ubicación de tu camión. 
          ¡Mantente informado en todo momento!
        </Text>
        
        <Link href="/TruckSelection" style={styles.button}>
          <Text style={styles.buttonText}>Comenzar a Rastrear</Text>
        </Link>
      </View>
      
      <Text style={styles.footer}>© 2024 Track My Panther. Todos los derechos reservados.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4C1D95', // Morado oscuro
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    width: '80%',
  },
  iconContainer: {
    backgroundColor: '#FBBF24', // Amarillo
    borderRadius: 50,
    padding: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#E9D5FF', // Morado claro
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#E9D5FF', // Morado claro
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#FBBF24', // Amarillo
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#4C1D95', // Morado oscuro
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    color: '#E9D5FF', // Morado claro
    fontSize: 12,
  },
});
