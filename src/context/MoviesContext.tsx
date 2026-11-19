import React, { createContext, ReactNode, useContext, useState } from "react";
import { INITIAL_MOVIES } from "../data/movies";
import { Movie } from "../types/movie";

type MoviesContextType = {
  movies: Movie[];
  loading: boolean;
  addMovie: (movie: Movie) => Promise<void>;
  updateMovie: (id: string, values: Partial<Movie>) => Promise<void>;
  toggleSaved: (id: string) => Promise<void>;
  removeMovie: (id: string) => Promise<void>;
  refreshMovies: () => Promise<void>;
};

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export default function MoviesProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>(INITIAL_MOVIES);
  const [loading, setLoading] = useState(false);

  const refreshMovies = async () => {};

  const addMovie = async (movie: Movie) => {
    setMovies((prev) => [movie, ...prev]);
  };

  const updateMovie = async (id: string, values: Partial<Movie>) => {
    setMovies((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...values } : item)),
    );
  };

  const toggleSaved = async (id: string) => {
    setMovies((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, saved: !item.saved } : item,
      ),
    );
  };

  const removeMovie = async (id: string) => {
    setMovies((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        loading,
        addMovie,
        updateMovie,
        toggleSaved,
        removeMovie,
        refreshMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MoviesContext);
  if (!context) throw new Error("useMovies must be inside MoviesProvider");
  return context;
}
