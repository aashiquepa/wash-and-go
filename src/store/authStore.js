import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

export const USER={token: '', refreshToken: '', name: ''}

export const useAuthStore = create(
  persist(
    (set, get) => ({
      auth: USER, //intial value
      initializing: true,
      setAuth: auths => set({auth: {...get().auth, ...auths}}), //function to change auth
      setRefreshToken: refreshToken =>
        set({auth: {...get().auth, refreshToken}}), //function to change refreshToken
      setInitializing: initializing => set({initializing}),
    }),
    {
      name: 'user-session', // storing the token in the local storage
      storage: createJSONStorage(() => {
        try {
          return AsyncStorage;
        } catch (error) {
          console.error('Error accessing sessionStorage:', error);
          return;
        }
      }),
      onRehydrateStorage: state => {
        // function to know wether the apploads data from the local storage
        return (state, error) => {
          if (error) {
            console.log('an error happened during hydration', error);
          } else {
            state.setInitializing(false);
          }
        };
      },
    },
  ),
);
