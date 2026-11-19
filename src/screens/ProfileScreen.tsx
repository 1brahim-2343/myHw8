import React from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import ScreenHeader from "../components/ScreenHeader";
import { useMovies } from "../context/MoviesContext";
import { Colors } from "../constants/theme";

export default function ProfileScreen() {
  const { movies } = useMovies();
  const savedCount = movies.filter((movie) => movie.saved).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScreenHeader title="Profile" subtitle="Your movie space" />
        <View style={styles.userBox}>
          <View style={styles.userIconWrapper}>
            <Ionicons name="person" size={43} color={Colors.primary} />
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userBio}>
            Movie Lover{" "}
            <Ionicons name="film" size={13} color={Colors.textSecondary} />
          </Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{movies.length}</Text>
              <Text style={styles.summaryLabel}>Movies</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{savedCount}</Text>
              <Text style={styles.summaryLabel}>Saved</Text>
            </View>
          </View>
        </View>
        
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, padding: 18 },
  userBox: {
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 18,
    paddingVertical: 24,
    marginBottom: 20,
  },
  userIconWrapper: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  userName: { color: Colors.text, fontWeight: "bold", fontSize: 21 },
  userBio: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 5,
  },
  summaryRow: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    gap: 32,
  },
  summaryItem: { alignItems: "center", gap: 3 },
  summaryValue: { color: Colors.primary, fontWeight: "bold", fontSize: 19 },
  summaryLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
  },
  verticalDivider: { width: 1, height: 30, backgroundColor: Colors.border },
});
