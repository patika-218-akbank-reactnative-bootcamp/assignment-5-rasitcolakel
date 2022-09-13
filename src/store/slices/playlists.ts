import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Playlist, SearchResponse } from '@src/types/APITypes';
import { search } from '@src/utils/api';

const initialState: SearchResponse<Playlist> = {
  data: [],
  total: 0,
  next: '',
  loading: true,
};

export const fetchPlaylists = createAsyncThunk('playlists/fetch', async () => {
  const response = await search<Playlist>({
    type: 'playlist',
  });
  return response;
});

export const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setPlaylists: (state, action) => {
      state.data.push(action.payload.data);
      state.total = action.payload.total;
      state.next = action.payload.next;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchPlaylists.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPlaylists.fulfilled,
        (state, action: PayloadAction<SearchResponse<Playlist>>) => {
          // Add user to the state array
          state.data = action.payload.data;
          state.total = action.payload.total;
          state.next = action.payload.next;
          state.loading = false;
        },
      )
      .addCase(fetchPlaylists.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setPlaylists } = playlistsSlice.actions;

export default playlistsSlice.reducer;
