import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Track } from '@src/types/APITypes';
import * as FileSystem from 'expo-file-system';

type PlayerState = {
  playingTrack: Track | null;
  playing: boolean;
  loading: boolean;
  downloading: boolean;
  uri: string;
  height: number;
  routeName: string;
};
const initialState: PlayerState = {
  playingTrack: null,
  playing: false,
  loading: false,
  downloading: false,
  uri: '',
  height: 0,
  routeName: '',
};

type DownloadTrackPayload = {
  track: Track;
  uri: string;
};
export const playTrack = createAsyncThunk(
  'player/play',
  async (track: Track, { getState, dispatch }) => {
    const getInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + track.id + '.mp3');
    dispatch(setPlayingTrack(track));
    if (getInfo.exists) {
      console.log('file exists', getInfo);
      return {
        uri: getInfo.uri,
        track,
      };
    } else {
      const download = await FileSystem.downloadAsync(
        track.preview,
        FileSystem.documentDirectory + track.id + '.mp3',
      );
      console.log('download', download);
      return {
        uri: download.uri,
        track,
      };
    }
  },
);

export const stopTrack = createAsyncThunk('player/stop', async () => {
  return null;
});

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
    setRouteName: (state, action: PayloadAction<string>) => {
      state.routeName = action.payload;
    },
    setPlayingTrack: (state, action: PayloadAction<Track>) => {
      state.playingTrack = action.payload;
      state.playing = false;
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.playing = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(playTrack.pending, (state) => {
        state.loading = true;
        state.downloading = true;
      })
      .addCase(playTrack.fulfilled, (state, action: PayloadAction<DownloadTrackPayload>) => {
        // Add user to the state array
        state.playingTrack = action.payload.track;
        state.loading = false;
        state.downloading = false;
        state.uri = action.payload.uri;
        state.playing = true;
      })
      .addCase(playTrack.rejected, (state) => {
        state.loading = false;
      })
      .addCase(stopTrack.fulfilled, (state) => {
        state.playing = false;
      });
  },
});

export const { setHeight, setRouteName, setPlayingTrack, setPlaying } = playerSlice.actions;

export default playerSlice.reducer;
