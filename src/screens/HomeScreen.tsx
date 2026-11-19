import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenHeader from "../components/ScreenHeader";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../context/MoviesContext";
import { Colors } from "../constants/theme";

export default function HomeScreen() {
  const { movies, loading, toggleSaved } = useMovies();
  const [query, setQuery] = useState("");

  const filteredMovies = movies.filter((movie) => {
    const text = query.trim().toLowerCase();
    if (!text) return true;
    return (
      movie.name.toLowerCase().includes(text) ||
      movie.genre.some((g) => g.toLowerCase().includes(text))
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.headerArea}>
            <View style={styles.headerRow}>
              <ScreenHeader
                title="Movies"
                subtitle="Browse collection and watchlist"
              />
              <View style={styles.iconCircle}>
                <Ionicons name="film-outline" size={24} color={Colors.primary} />
              </View>
            </View>

            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color={Colors.textSecondary} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search movies or genre..."
                placeholderTextColor={Colors.textPlaceholder}
                style={styles.searchInput}
                clearButtonMode="while-editing"
              />
            </View>

            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Featured Movies</Text>
              <Text style={styles.countText}>
                {filteredMovies.length} {filteredMovies.length === 1 ? "movie" : "movies"}
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <MovieCard movie={item} onSave={() => toggleSaved(item.id)} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>
              {loading ? "Loading..." : "No movies found."}
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerArea: {
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
  },
  countText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  emptyWrap: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});
