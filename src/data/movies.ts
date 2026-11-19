import { Movie } from "../types/movie";

export const INITIAL_MOVIES: Movie[] = [
  {
    id: "1",
    name: "Inception",
    description:
      "A skilled thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    imageUrl: {
      uri: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    },
    tags: ["2D", "IMAX"],
    genre: ["Action", "Sci-Fi"],
    imdbRating: 8.8,
    duration: "2h 28m",
    rotten: "87%",
    saved: true,
  },
  {
    id: "2",
    name: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth faces famine.",
    imageUrl: {
      uri: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
    tags: ["2D", "IMAX"],
    genre: ["Adventure", "Drama", "Sci-Fi"],
    imdbRating: 8.7,
    duration: "2h 49m",
    rotten: "73%",
    saved: false,
  },
  {
    id: "3",
    name: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    imageUrl: {
      uri: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    tags: ["2D", "IMAX"],
    genre: ["Action", "Crime", "Drama"],
    imdbRating: 9.0,
    duration: "2h 32m",
    rotten: "94%",
    saved: true,
  },
  {
    id: "4",
    name: "Oppenheimer",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    imageUrl: {
      uri: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    },
    tags: ["2D", "IMAX"],
    genre: ["Biography", "Drama", "History"],
    imdbRating: 8.9,
    duration: "3h 00m",
    rotten: "93%",
    saved: false,
  },
  {
    id: "5",
    name: "Spider-Man: Across the Spider-Verse",
    description:
      "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    imageUrl: {
      uri: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    },
    tags: ["2D", "3D", "4D"],
    genre: ["Animation", "Action", "Adventure"],
    imdbRating: 8.7,
    duration: "2h 20m",
    rotten: "95%",
    saved: false,
  },
];
