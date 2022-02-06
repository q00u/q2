/* eslint-disable no-console */
import { defineStore } from 'pinia';

export interface TitleState {
  activeSearch: string,
  showOptions: boolean,
  showHistory: boolean,
}

export const useTitleStore = defineStore('Title', {
  state: ():TitleState => ({
    activeSearch: '',
    showOptions: false,
    showHistory: false,
  }),
});
