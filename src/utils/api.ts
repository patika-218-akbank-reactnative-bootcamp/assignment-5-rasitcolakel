import { GenresResponse, PlaylistScreen, SearchResponse, Track } from '@src/types/APITypes';
import axios from 'axios';
import { UserCredential } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { config } from './config';
import { auth, db } from './firebase';

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

export async function setLikedTrack(track: Track): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'likedTracks'),
      where('creator', '==', auth.currentUser?.uid),
      where('id', '==', track.id),
    );
    const querySnapshot = await getDocs(q);
    const isAlreadyAdded = querySnapshot.docs.find((doc) => doc.data().id === track.id);
    if (isAlreadyAdded) {
      // update it to the new value
      await updateDoc(doc(db, 'likedTracks', isAlreadyAdded.id), {
        isLiked: !isAlreadyAdded.data().isLiked,
      });
      return;
    }

    // add it to the db
    await addDoc(collection(db, 'likedTracks'), {
      creator: auth.currentUser?.uid,
      isLiked: true,
      id: track.id,
      track: JSON.stringify(track),
    });
    return true;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function getLikedTracks(): Promise<Track[]> {
  try {
    const q = query(
      collection(db, 'likedTracks'),
      where('creator', '==', auth.currentUser?.uid),
      where('isLiked', '==', true),
    );
    const querySnapshot = await getDocs(q);
    const likedTracks = querySnapshot.docs.map((doc) => JSON.parse(doc.data().track));
    return likedTracks;
  } catch (error) {
    console.log('Error getting documents: ', error);
  }
}

export async function saveUserToFirestore(user: UserCredential): Promise<void> {
  const userDoc = doc(db, 'users', user.user.uid);
  const docData = {
    id: user.user.uid,
    email: user.user.email,
    displayName: user.user.displayName,
  };
  const response = await setDoc(userDoc, docData);
  console.log('Document written with ID: ', response);
  return response;
}
