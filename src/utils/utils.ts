import { NavigationState, PartialState } from '@react-navigation/native';

// this function takes a string and returns a string for converting hex to rgb or rgba
export const hexToRGB = (hex: string, alpha = 1): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
};

export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState> | undefined,
): string {
  if (!state || typeof state.index !== 'number') {
    return 'Unknown';
  }

  const route = state.routes[state.index];

  if (route.state) {
    return getActiveRouteName(route.state);
  }

  return route.name;
}

export function isDetailScreen(routeName: string): boolean {
  const details = ['ArtistDetail', 'PlaylistDetail', 'GenreDetail'];
  return details.includes(routeName);
}
