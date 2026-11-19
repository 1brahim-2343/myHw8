import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMovies } from "../context/MoviesContext";
import { Colors } from "../constants/theme";
import { Movie } from "../types/movie";

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { movies, toggleSaved } = useMovies();
  const [movie, setMovie] = useState<Movie | undefined>();
  useEffect(() => {
    setMovie(movies.find((item) => item.id === id));
  }, [movies, id]);

  if (!movie)
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={Colors.primary} />
        <Text style={styles.loadingText}>Loading movie...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={movie.imageUrl}
          style={styles.posterBanner}
          imageStyle={styles.posterImage}
        >
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconButton}
            >
              <Ionicons name="arrow-back" size={23} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleSaved(movie.id)}
              style={styles.iconButton}
            >
              <Ionicons
                name={movie.saved ? "bookmark" : "bookmark-outline"}
                size={23}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.posterDetails}>
            <Text style={styles.movieTitle}>{movie.name}</Text>
            <View style={styles.formatTags}>
              {movie.tags.map((tag) => (
                <Text key={tag} style={styles.formatTag}>
                  {tag}
                </Text>
              ))}
            </View>
          </View>
        </ImageBackground>
        <View style={styles.detailsContent}>
          <View style={styles.ratingSummary}>
            <View style={styles.ratingColumn}>
              <View style={styles.scoreRow}>
                <Ionicons name="star" size={19} color={Colors.rating} />
                <Text style={styles.scoreText}>
                  {movie.imdbRating.toFixed(1)}
                </Text>
              </View>
              <Text style={styles.scoreDescription}>IMDb Rating</Text>
            </View>
            <View style={styles.verticalSeparator} />
            <View style={styles.ratingColumn}>
              <View style={styles.scoreRow}>
                <Ionicons
                  name="thumbs-up"
                  size={18}
                  color={Colors.rottenTomatoes}
                />
                <Text style={styles.scoreText}>{movie.rotten}</Text>
              </View>
              <Text style={styles.scoreDescription}>Rotten Tomatoes</Text>
            </View>
            <View style={styles.verticalSeparator} />
            <View style={styles.ratingColumn}>
              <View style={styles.scoreRow}>
                <Ionicons name="time-outline" size={19} color="#FFFFFF" />
                <Text style={styles.scoreText}>{movie.duration}</Text>
              </View>
              <Text style={styles.scoreDescription}>Duration</Text>
            </View>
          </View>
          <Text style={styles.sectionTitle}>Genre</Text>
          <View style={styles.genresList}>
            {movie.genre.map((item) => (
              <Text key={item} style={styles.genreTag}>
                {item}
              </Text>
            ))}
          </View>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{movie.description}</Text>
          <TouchableOpacity
            style={[styles.saveButton, movie.saved && styles.savedButton]}
            onPress={() => toggleSaved(movie.id)}
          >
            <Ionicons
              name={movie.saved ? "bookmark" : "bookmark-outline"}
              size={19}
              color="#FFFFFF"
            />
            <Text style={styles.saveText}>
              {movie.saved ? "Remove from Saved" : "Save Movie"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.darkBackground },
  loading: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  loadingText: { color: Colors.textSecondary },
  posterBanner: {
    height: 440,
    justifyContent: "space-between",
    paddingTop: 54,
    paddingHorizontal: 18,
    paddingBottom: 26,
    backgroundColor: Colors.darkSurface,
  },
  posterImage: { opacity: 0.88 },

  topBar: { flexDirection: "row", justifyContent: "space-between" },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(10,18,31,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  posterDetails: { gap: 12 },
  movieTitle: { color: "#FFFFFF", fontWeight: "bold", fontSize: 30 },
  formatTags: { flexDirection: "row", gap: 7 },
  formatTag: {
    color: "#FFFFFF",
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 9,
    overflow: "hidden",
    fontWeight: "600",
    fontSize: 12,
  },
  detailsContent: { padding: 20, paddingBottom: 40 },
  ratingSummary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.darkSurface,
    borderRadius: 16,
    paddingVertical: 17,
    paddingHorizontal: 10,
    marginBottom: 28,
  },
  ratingColumn: { flex: 1, alignItems: "center", gap: 5 },
  scoreRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  scoreText: { color: "#FFFFFF", fontWeight: "600", fontSize: 14 },
  scoreDescription: {
    color: Colors.darkTextSecondary,
    fontSize: 10,
    textAlign: "center",
  },
  verticalSeparator: { width: 1, height: 34, backgroundColor: Colors.darkBorder },
  sectionTitle: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 11,
    marginTop: 7,
  },
  genresList: { flexDirection: "row", gap: 8, marginBottom: 22 },
  genreTag: {
    color: "#FFFFFF",
    backgroundColor: Colors.darkSurfaceSecondary,
    borderRadius: 18,
    paddingHorizontal: 13,
    paddingVertical: 7,
    fontSize: 12,
  },
  description: {
    color: Colors.darkTextSecondary,
    fontSize: 14,
    lineHeight: 23,
  },
  saveButton: {
    marginTop: 25,
    backgroundColor: Colors.primary,
    minHeight: 50,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  savedButton: { backgroundColor: Colors.darkSurfaceSecondary },
  saveText: { color: "#FFFFFF", fontWeight: "600", fontSize: 14 },
});
