import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Playlist, SearchResponse } from '@src/types/APITypes';

const initialState: SearchResponse<Playlist> = {
  data: [],
  total: 0,
  next: '',
};

export const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setPlaylists: (state, action: PayloadAction<SearchResponse<Playlist>>) => {
      state.data = action.payload.data;
      state.total = action.payload.total;
      state.next = action.payload.next;
    },
  },
});

export const { setPlaylists } = playlistsSlice.actions;

export default playlistsSlice.reducer;
