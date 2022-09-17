import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Artist, SearchResponse, Track } from '@src/types/APITypes';
import { getTracksFromArtist } from '@src/utils/api';
import _ from 'lodash';

type PlaylistsState = {
  artistScreen: SearchResponse<Track> & {
    artist: Artist | null;
  };
};

const initialState: PlaylistsState = {
  artistScreen: {
    data: [],
    total: 0,
    next: '',
    artist: null,
    loading: true,
  },
};

export const fetchTracksFromArtist = createAsyncThunk(
  'artists/fetchTracks',
  async (artist: Artist) => {
    const response = await getTracksFromArtist(artist.id);
    console.log('response', response);
    return response;
  },
);

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    setArtistTracks: (state, action: PayloadAction<SearchResponse<Track>>) => {
      const uniqueTracks = _.uniqBy(
        [...state.artistScreen.data, ...action.payload.data],
        function (e) {
          return e.id;
        },
      );
      state.artistScreen.data = uniqueTracks;
      state.artistScreen.total = action.payload.total;
      state.artistScreen.next = action.payload.next;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchTracksFromArtist.pending, (state, action) => {
        state.artistScreen.loading = true;
        state.artistScreen.artist = action.meta.arg;
      })
      .addCase(
        fetchTracksFromArtist.fulfilled,
        (state, action: PayloadAction<SearchResponse<Track>>) => {
          // Add user to the state array
          state.artistScreen.data = action.payload.data;
          state.artistScreen.total = action.payload.total;
          state.artistScreen.next = action.payload.next;
          state.artistScreen.loading = false;
        },
      )
      .addCase(fetchTracksFromArtist.rejected, (state, action) => {
        state.artistScreen.loading = false;
      });
  },
});

export const { setArtistTracks } = artistsSlice.actions;

export default artistsSlice.reducer;
