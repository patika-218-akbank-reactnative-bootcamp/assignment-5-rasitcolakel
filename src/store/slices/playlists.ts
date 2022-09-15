import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Playlist, PlaylistScreen, SearchResponse } from '@src/types/APITypes';
import { fetchPlaylist, search } from '@src/utils/api';

type PlaylistsState = SearchResponse<Playlist> & {
  playlistScreen: {
    playlist: PlaylistScreen | null;
    loading: boolean;
  };
};

const initialState: PlaylistsState = {
  data: [],
  total: 0,
  next: '',
  loading: true,
  playlistScreen: {
    playlist: null,
    loading: true,
  },
};

export const fetchPlaylists = createAsyncThunk('playlists/fetch', async () => {
  const response = await search<Playlist>({
    type: 'playlist',
  });
  return response;
});

export const getPlaylist = createAsyncThunk('playlists/get', async (id: number) => {
  const response = await fetchPlaylist(id);
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
      })
      .addCase(getPlaylist.pending, (state) => {
        state.playlistScreen.loading = true;
      })
      .addCase(getPlaylist.fulfilled, (state, action: PayloadAction<PlaylistScreen>) => {
        // Add user to the state array
        state.playlistScreen.playlist = action.payload;
        state.playlistScreen.loading = false;
      })
      .addCase(getPlaylist.rejected, (state) => {
        state.playlistScreen.loading = false;
      });
  },
});

export const { setPlaylists } = playlistsSlice.actions;

export default playlistsSlice.reducer;
