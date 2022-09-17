import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Artist, Genre, GenresResponse } from '@src/types/APITypes';
import { getArtistsFromGenre } from '@src/utils/api';

type PlaylistsState = GenresResponse & {
  genreScreen: {
    genre: Genre | null;
    loading: boolean;
    artists: Artist[];
  };
};

const initialState: PlaylistsState = {
  data: [],
  genreScreen: {
    genre: null,
    loading: true,
    artists: [],
  },
};

export const fetchGenreArtists = createAsyncThunk('genres/fetchArtists', async (genre: Genre) => {
  const response = await getArtistsFromGenre(genre.id);
  return response;
});

export const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<Genre[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchGenreArtists.pending, (state, action) => {
        state.genreScreen.loading = true;
        state.genreScreen.genre = action.meta.arg;
      })
      .addCase(fetchGenreArtists.fulfilled, (state, action: PayloadAction<Artist[]>) => {
        state.genreScreen.loading = false;
        state.genreScreen.artists = action.payload;
      });
  },
});

export const { setGenres } = genresSlice.actions;

export default genresSlice.reducer;
