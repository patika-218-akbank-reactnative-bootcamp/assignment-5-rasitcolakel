import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SearchResponse, Track } from '@src/types/APITypes';
import { search } from '@src/utils/api';
import _ from 'lodash';

const initialState: SearchResponse<Track> = {
  data: [],
  total: 0,
  next: '',
  loading: true,
};
export const fetchTracks = createAsyncThunk('tracks/fetch', async () => {
  const response = await search<Track>({
    type: 'track',
  });
  return response;
});

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setTracks: (state, action: PayloadAction<SearchResponse<Track>>) => {
      const uniqueTracks = _.uniqBy([...state.data, ...action.payload.data], function (e) {
        return e.id;
      });
      state.data = uniqueTracks;
      state.total = action.payload.total;
      state.next = action.payload.next;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTracks.fulfilled, (state, action: PayloadAction<SearchResponse<Track>>) => {
        // Add user to the state array
        state.data = action.payload.data;
        state.total = action.payload.total;
        state.next = action.payload.next;
        state.loading = false;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setTracks } = tracksSlice.actions;

export default tracksSlice.reducer;
