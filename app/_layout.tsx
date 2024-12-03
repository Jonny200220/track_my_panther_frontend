import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"/>
      <Stack.Screen name="TruckSelection" options={{title: 'Truck'}}/>
      <Stack.Screen name="MapView" options={{title: 'Map'}}/>
    </Stack>
  );
}
