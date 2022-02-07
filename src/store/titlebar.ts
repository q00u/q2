/* eslint-disable no-console */
import { defineStore } from 'pinia';

export interface TitleState {
  activeSearch: string,
  showSettings: boolean,
  showHistory: boolean,
}

export const useTitleStore = defineStore('Title', {
  state: ():TitleState => ({
    activeSearch: '',
    showSettings: false,
    showHistory: false,
  }),
  persist: {
    enabled: true,
  },
});
