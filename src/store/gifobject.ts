/* eslint-disable no-console */
import { defineStore } from 'pinia';

export interface GifState {
  activeIds: string[],
}

export const useGifStore = defineStore('Gif', {
  state: ():GifState => ({
    activeIds: [],
  }),

  actions: {
    activate(idString: string) {
      if (!this.activeIds.includes(idString)) this.activeIds.push(idString);
      // this.activeIds.add(idString);
      console.debug('GifState: activate', idString, this.activeIds);
    },
    deactivate(idString: string) {
      if (this.activeIds.includes(idString)) {
        this.activeIds.splice(this.activeIds.indexOf(idString), 1);
      }
      // this.activeIds.delete(idString);
      console.debug('GifState: deactivate', idString, this.activeIds);
    },
    clear() {
      // this.activeIds.clear();
      this.activeIds.length = 0;
    },
  },
});
