import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import MoviesProvider from "../context/MoviesContext";
import { Colors } from "../constants/theme";

export default function RootLayout() {
  return (
    <MoviesProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.background },
          headerShadowVisible: false,
          headerTintColor: Colors.primary,
          headerTitleStyle: { color: Colors.text, fontWeight: "bold" },
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details" options={{ headerShown: false }} />
      </Stack>
    </MoviesProvider>
  );
}
