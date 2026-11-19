import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../context/MoviesContext";
import { Colors } from "../constants/theme";

export default function SavedScreen() {
  const { movies, toggleSaved } = useMovies();
  const savedMovies = movies.filter((movie) => movie.saved);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={savedMovies}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <ScreenHeader
              title="Saved Movies"
              subtitle="Your personal watchlist"
            />
            <View style={styles.savedCounter}>
              <Text style={styles.savedCount}>{savedMovies.length}</Text>
              <Text style={styles.savedLabel}>
                saved {savedMovies.length === 1 ? "movie" : "movies"}
              </Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <MovieCard movie={item} onSave={() => toggleSaved(item.id)} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptySymbol}>♡</Text>
            <Text style={styles.emptyHeading}>No saved movies yet</Text>
            <Text style={styles.emptyDescription}>
              Tap the bookmark on any movie to add it to your watchlist.
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 18, paddingBottom: 28 },
  savedCounter: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 7,
    marginBottom: 16,
  },
  savedCount: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
  savedLabel: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  emptyContainer: { alignItems: "center", paddingHorizontal: 30, paddingVertical: 58 },
  emptySymbol: { fontSize: 54, color: Colors.primary, marginBottom: 10 },
  emptyHeading: { fontSize: 17, fontWeight: "bold", color: Colors.text },
  emptyDescription: {
    textAlign: "center",
    color: Colors.textSecondary,
    lineHeight: 21,
    marginTop: 8,
  },
});
