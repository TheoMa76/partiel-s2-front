export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    overview: string;
    genre_ids: number[];
    vote_average: number;
  }
  
  export interface Genre {
    id: number;
    name: string;
  }