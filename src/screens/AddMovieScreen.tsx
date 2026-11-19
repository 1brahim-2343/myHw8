import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ScreenHeader from "../components/ScreenHeader";
import { useMovies } from "../context/MoviesContext";
import { Colors } from "../constants/theme";
import { Movie } from "../types/movie";
import { DEFAULT_IMAGE } from "../types/movie";

const AVAILABLE_TAGS: Movie["tags"][number][] = ["2D", "3D", "IMAX", "4D"];
const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
];

export default function AddMovieScreen() {
  const { addMovie } = useMovies();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState<Movie["tags"]>(["2D"]);
  const [genre, setGenre] = useState<string[]>([]);
  const [imdbRating, setImdbRating] = useState("7.5");
  const [duration, setDuration] = useState("2h 00m");

  const toggleTag = (tag: Movie["tags"][number]) =>
    setTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );
  const toggleGenre = (item: string) =>
    setGenre((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item],
    );

  const handleAdd = async () => {
    if (!name.trim() || !description.trim() || !genre.length || !tags.length) {
      Alert.alert(
        "Missing information",
        "Please complete the name, description, tags and at least one genre.",
      );
      return;
    }
    const rating = Number(imdbRating);
    if (!Number.isFinite(rating) || rating < 0 || rating > 10) {
      Alert.alert(
        "Invalid rating",
        "IMDb rating must be a number between 0 and 10.",
      );
      return;
    }
    const movie: Movie = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      imageUrl: { uri: imageUrl.trim() || DEFAULT_IMAGE },
      tags,
      genre,
      imdbRating: rating,
      duration: duration.trim() || "Unknown",
      rotten: "N/A",
      saved: false,
    };
    await addMovie(movie);
    Alert.alert("Movie added", `${movie.name} was added to your collection.`);
    setName("");
    setDescription("");
    setImageUrl("");
    setTags(["2D"]);
    setGenre([]);
    setImdbRating("7.5");
    setDuration("2h 00m");
    router.replace("/");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Add Movie"
          subtitle="Add a film to your collection"
        />
        <View style={styles.posterPreview}>
          {imageUrl.trim() ? (
            <Image source={{ uri: imageUrl }} style={styles.previewImage} />
          ) : (
            <View style={styles.previewPlaceholder}>
              <Ionicons name="image-outline" size={34} color={Colors.primary} />
              <Text style={styles.previewText}>Poster preview</Text>
            </View>
          )}
        </View>
        <Text style={styles.label}>Image URL</Text>
        <TextInput
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="https://..."
          placeholderTextColor={Colors.textPlaceholder}
          autoCapitalize="none"
          style={styles.input}
        />
        <Text style={styles.label}>
          Movie name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter movie name"
          placeholderTextColor={Colors.textPlaceholder}
          style={styles.input}
        />
        <Text style={styles.label}>
          Description <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Write a short description"
          placeholderTextColor={Colors.textPlaceholder}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          style={[styles.input, styles.textArea]}
        />
        <Text style={styles.label}>
          Tags <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.tagsContainer}>
          {AVAILABLE_TAGS.map((tag) => (
            <TouchableOpacity
              key={tag}
              onPress={() => toggleTag(tag)}
              style={[
                styles.tagOption,
                tags.includes(tag) && styles.tagOptionActive,
              ]}
            >
              <Ionicons
                name={tags.includes(tag) ? "checkbox" : "square-outline"}
                size={17}
                color={
                  tags.includes(tag) ? Colors.primary : Colors.textSecondary
                }
              />
              <Text
                style={[
                  styles.tagOptionText,
                  tags.includes(tag) && styles.tagOptionTextActive,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>
          Genre <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.genresContainer}>
          {GENRES.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => toggleGenre(item)}
              style={[
                styles.genreButton,
                genre.includes(item) && styles.genreButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.genreLabel,
                  genre.includes(item) && styles.genreLabelActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputHalf}>
            <Text style={styles.label}>IMDb Rating</Text>
            <TextInput
              value={imdbRating}
              onChangeText={setImdbRating}
              keyboardType="decimal-pad"
              style={styles.input}
            />
          </View>
        </View>
        <Text style={styles.label}>Duration</Text>
        <TextInput
          value={duration}
          onChangeText={setDuration}
          placeholder="2h 49m"
          style={styles.input}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleAdd}>
          <Text style={styles.submitText}>Add Movie</Text>
          <Ionicons name="add" size={21} color="#FFFFFF" />
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 18, paddingBottom: 36 },
  posterPreview: {
    height: 130,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  previewImage: { width: "100%", height: "100%", resizeMode: "cover" },
  previewPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  previewText: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  label: {
    color: Colors.text,
    fontWeight: "600",
    fontSize: 13,
    marginBottom: 7,
    marginTop: 12,
  },
  required: { color: Colors.error },
  input: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 11,
    paddingHorizontal: 13,
    color: Colors.text,
    backgroundColor: Colors.surface,
    fontSize: 13,
  },
  textArea: { minHeight: 96, paddingTop: 12 },
  tagsContainer: { flexDirection: "row", gap: 16, flexWrap: "wrap" },
  tagOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 5,
  },
  tagOptionActive: {},
  tagOptionText: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  tagOptionTextActive: { color: Colors.primary, fontWeight: "600" },
  genresContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  genreButton: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: Colors.surface,
  },
  genreButtonActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  genreLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  genreLabelActive: { color: Colors.primaryDark, fontWeight: "600" },
  inputRow: { flexDirection: "row", gap: 12 },
  inputHalf: { flex: 1 },
  submitButton: {
    marginTop: 24,
    backgroundColor: Colors.primary,
    borderRadius: 13,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  submitText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 15 },
});
