import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Track } from '@src/types/APITypes';
import { getLikedTracks, setLikedTrack } from '@src/utils/api';

export type UserState = {
  accessToken: string | null;
  user: null | UserType;
};
export type UserType = {
  id: string;
  email: string;
  displayName: string;
  likedTracks?: Track[];
};
const initialState: UserState = {
  accessToken: null,
  user: null,
};

export const likeTrack = createAsyncThunk(
  'user/likeTrack',
  async (track: Track): Promise<Track[]> => {
    await setLikedTrack(track);
    const getTracks = await getLikedTracks();
    return getTracks;
  },
);

export const fetchLikedTracks = createAsyncThunk(
  'user/fetchLikedTracks',
  async (): Promise<Track[]> => {
    const getTracks = await getLikedTracks();
    console.log('getTracks.length', getTracks.length);
    return getTracks;
  },
);

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = {
        ...state.user,
        ...action.payload.user,
      };
      state.accessToken = action.payload.accessToken;
    },
    updateUser: (state, action: PayloadAction<UserType>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    logOut: (state) => {
      state = {
        ...initialState,
      };
      return state;
    },
    setLikedTracks: (state, action: PayloadAction<Track[]>) => {
      state.user = {
        ...state.user,
        likedTracks: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(likeTrack.fulfilled, (state, action) => {
        state.user.likedTracks = action.payload;
      })
      .addCase(fetchLikedTracks.fulfilled, (state, action) => {
        state.user.likedTracks = action.payload;
      });
  },
});

export const { setUser, logOut, updateUser, setLikedTracks } = userSlice.actions;

export default userSlice.reducer;
