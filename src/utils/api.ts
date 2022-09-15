import { GenresResponse, PlaylistScreen, SearchResponse } from '@src/types/APITypes';
import axios from 'axios';

import { config } from './config';

export const getGenres = async (): Promise<GenresResponse> => {
  const request = await axios.get<GenresResponse>(config.SONG_API_URL + 'genre');
  return request.data;
};
type SearchType =
  | 'album'
  | 'artist'
  | 'history'
  | 'playlist'
  | 'podcast'
  | 'radio'
  | 'track'
  | 'user';
type SearchProps = {
  type?: SearchType;
  q?: string;
  limit?: number;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export async function search<T>({ type, q, limit }: SearchProps): Promise<SearchResponse<T>> {
  const params = new URLSearchParams();
  params.append('q', q || 'a');
  params.append('limit', (limit || 10).toString());
  const search = `search${type ? '/' + type : ''}?`;
  const request = await axios.get<SearchResponse<T>>(
    `${config.SONG_API_URL}${search}${params.toString()}`,
  );
  await sleep(1000);
  return request.data;
}

export async function searchFromUrl<T>(url: string): Promise<SearchResponse<T>> {
  const request = await axios.get<SearchResponse<T>>(url);
  return request.data;
}

export async function fetchPlaylist(id: number): Promise<PlaylistScreen> {
  const request = await axios.get<PlaylistScreen>(`${config.SONG_API_URL}playlist/${id}`);
  return request.data;
}
