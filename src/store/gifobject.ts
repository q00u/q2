import { defineStore } from 'pinia';

export interface GifState {
  activeIds: string[], // Avoid race conditions with array rather than single string
  showGif: boolean, // Show full-size gif in dialog
  gifSrcFull: string, // The full-size gif to show
}

export const useGifStore = defineStore('Gif', {
  state: ():GifState => ({
    activeIds: [],
    showGif: false,
    gifSrcFull: '',
  }),

  actions: {
    activate(idString: string) {
      if (!this.activeIds.includes(idString)) this.activeIds.push(idString);
    },
    deactivate(idString: string) {
      if (this.activeIds.includes(idString)) {
        this.activeIds.splice(this.activeIds.indexOf(idString), 1);
      }
    },
    clear() {
      this.activeIds.length = 0;
    },
  },
});
