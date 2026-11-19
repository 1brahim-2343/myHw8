import { ImageSourcePropType } from "react-native";

export interface Movie {
  id: string;
  name: string;
  description: string;
  imageUrl: ImageSourcePropType;
  tags: string[];
  genre: string[];
  imdbRating: number;
  duration: string;
  rotten: string;
  saved: boolean;
}

export const DEFAULT_POSTER =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80";
