import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { genresSlice } from './slices/genres';
import { playlistsSlice } from './slices/playlists';
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
