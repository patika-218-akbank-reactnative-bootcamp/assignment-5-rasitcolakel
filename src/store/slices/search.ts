import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Album, Artist, SearchResponse, Track } from '@src/types/APITypes';
import { search } from '@src/utils/api';
import _ from 'lodash';

type SearchState = {
  isSearching?: boolean;
  search?: string;
};
type SearchType = SearchResponse<Track | Artist | Album> & SearchState;
const initialState: SearchType = {
  data: [],
  total: 0,
  next: '',
  loading: true,
  isSearching: false,
  search: '',
};
export const postSearch = createAsyncThunk('search/fetch', async (q: string) => {
  const response = await search<Track>({
    q,
    limit: 500,
  });
  return response;
});

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setTracks: (state, action: PayloadAction<SearchType>) => {
      const uniqueTracks = _.uniqBy([...state.data, ...action.payload.data], function (e) {
        return e.id;
      });
      state.data = uniqueTracks;
      state.total = action.payload.total;
      state.next = action.payload.next;
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    clearSearch: (state) => {
      state.data = [];
      state.total = 0;
      state.next = '';
      // state.isSearching = false;
      state.search = '';
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(postSearch.pending, (state, action) => {
        state.loading = true;
        state.search = action.meta.arg;
      })
      .addCase(postSearch.fulfilled, (state, action: PayloadAction<SearchResponse<Track>>) => {
        // Add user to the state array
        state.data = action.payload.data;
        state.total = action.payload.total;
        state.next = action.payload.next;
        state.loading = false;
      })
      .addCase(postSearch.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setTracks, setSearch, setIsSearching, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
