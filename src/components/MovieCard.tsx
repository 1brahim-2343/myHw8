import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Movie } from "../types/movie";
import { Colors } from "../constants/theme";

interface MovieCardProps {
  movie: Movie;
  onSave?: () => void;
}

export default function MovieCard({ movie, onSave }: MovieCardProps) {
  const handleOpenDetails = () => {
    router.push({ pathname: "/details", params: { id: movie.id } });
  };

  return (
    <Pressable style={styles.card} onPress={handleOpenDetails}>
      <Image source={movie.imageUrl} style={styles.poster} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {movie.name}
        </Text>
        <Text numberOfLines={1} style={styles.genre}>
          {movie.genre.join(", ")}
        </Text>

        <View style={styles.metaRow}>
          <Ionicons name="star" size={15} color={Colors.rating} />
          <Text style={styles.rating}>{movie.imdbRating.toFixed(1)}</Text>
          <Ionicons
            name="time-outline"
            size={15}
            color={Colors.textSecondary}
            style={styles.timeIcon}
          />
          <Text style={styles.duration}>{movie.duration}</Text>
        </View>

        <View style={styles.badgeRow}>
          {movie.tags.map((tag) => (
            <Text key={tag} style={styles.badge}>
              {tag}
            </Text>
          ))}
        </View>
      </View>

      {onSave ? (
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            onSave();
          }}
          hitSlop={8}
          style={styles.bookmarkButton}
        >
          <Ionicons
            name={movie.saved ? "bookmark" : "bookmark-outline"}
            size={22}
            color={movie.saved ? Colors.primary : Colors.textSecondary}
          />
        </Pressable>
      ) : (
        <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  poster: {
    width: 74,
    height: 104,
    borderRadius: 8,
    backgroundColor: Colors.border,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 15,
  },
  genre: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeIcon: {
    marginLeft: 8,
  },
  rating: {
    color: Colors.text,
    fontWeight: "600",
    fontSize: 13,
  },
  duration: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
  },
  badge: {
    color: Colors.badgeText,
    backgroundColor: Colors.badgeBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    fontWeight: "600",
    fontSize: 10,
    overflow: "hidden",
  },
  bookmarkButton: {
    padding: 6,
  },
});
