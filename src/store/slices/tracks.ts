import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SearchResponse, Track } from '@src/types/APITypes';
import _ from 'lodash';

const initialState: SearchResponse<Track> = {
  data: [],
  total: 0,
  next: '',
};

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
});

export const { setTracks } = tracksSlice.actions;

export default tracksSlice.reducer;
