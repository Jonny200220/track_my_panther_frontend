import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#F8F9FA' }, // Fondo gris claro
          headerTintColor: '#1D3557', // Texto azul profundo (si se necesita un título)
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="TruckSelection"
          options={{
            // title: 'Busqueda'
            headerShown: false, // Oculta completamente el encabezado
          }}
        />
        {/* <Stack.Screen
          name="TruckMap"
          options={{
            title: 'Mapa de Camión',
            headerStyle: { backgroundColor: '#F8F9FA' },
            headerTintColor: '#1D3557',
          }}
        /> */}
      </Stack>
      <StatusBar style="auto"/>
    </>
  );
}
