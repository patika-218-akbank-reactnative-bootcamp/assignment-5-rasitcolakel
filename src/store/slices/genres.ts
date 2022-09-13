import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Genre, GenresResponse } from '@src/types/APITypes';

const initialState: GenresResponse = {
  data: [],
};

export const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<Genre[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setGenres } = genresSlice.actions;

export default genresSlice.reducer;
