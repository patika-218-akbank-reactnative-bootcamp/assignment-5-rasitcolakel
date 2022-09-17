import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { artistsSlice } from './slices/artists';
import { genresSlice } from './slices/genres';
import { playerSlice } from './slices/player';
import { playlistsSlice } from './slices/playlists';
import { searchSlice } from './slices/search';
import { themeSlice } from './slices/theme';
import { tracksSlice } from './slices/tracks';
import { userSlice } from './slices/user';

// ...
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    theme: themeSlice.reducer,
    genres: genresSlice.reducer,
    playlists: playlistsSlice.reducer,
    tracks: tracksSlice.reducer,
    search: searchSlice.reducer,
    player: playerSlice.reducer,
    artists: artistsSlice.reducer,
  },
  // devtools is enabled by default in development mode
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    if (__DEV__) {
      return getDefaultMiddleware();
    }

    return getDefaultMiddleware();
  },
});
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
