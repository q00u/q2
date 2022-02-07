/* eslint-disable no-console */
import { defineStore, storeToRefs } from 'pinia';
import giphyApi from 'giphy-api';
import { useQuasar } from 'quasar';
import { useGifStore } from './gifobject';
import { useTitleStore } from './titlebar';

const giphy = giphyApi({ https: true, apiKey: process.env.PUBLIC_KEY });
const $q = useQuasar();

export interface SearchState {
  activeResults: giphyApi.MultiResponse | null,
  searchHistory: { [searchQuery: string]: giphyApi.MultiResponse | null },
  searchOptions: giphyApi.SearchOptions,
}

export const useSearchStore = defineStore('Search', {
  state: ():SearchState => ({
    activeResults: null,
    searchHistory: {},
    searchOptions: {
      rating: 'g',
      q: '',
      limit: 24,
    },
  }),
  persist: {
    enabled: true,
  },

  actions: {
    // Remove search from history
    removeSearch(searchString: string) {
      delete this.searchHistory[searchString];
    },

    // Grab latest trending
    newTrending() {
      const titleStore = useTitleStore();
      const { activeSearch, showHistory, showSettings } = storeToRefs(titleStore);
      if (activeSearch.value === '') {
        console.debug('action: trending');
        activeSearch.value = 'Trending';
        if (!this.searchHistory.Trending) {
          console.debug('action: trending: calling giphy with', this.searchOptions);
          void giphy.trending(this.searchOptions).then((res) => {
            console.debug('action: trending: results:', res);
            this.activeResults = res;
            this.searchHistory.Trending = res;
          }).catch((err) => {
            console.error('Broke while trying to get Trending from Giphy\n', err);
            $q.notify({
              group: false,
              progress: true,
              type: 'negative',
              message: 'Something went wrong trying to get trending...',
            });
          });
        }
        // Hide all dialogs
        showHistory.value = false;
        showSettings.value = false;
      }
    },

    newSearch(searchString: string, cached = true) {
      console.debug('action: newSearch', searchString, cached);
      if (!searchString) return;
      const titleStore = useTitleStore();
      const { activeSearch, showHistory, showSettings } = storeToRefs(titleStore);
      // Make this the active search
      activeSearch.value = searchString;
      // If we haven't done this search (or aren't caching), run it now
      if (!cached || !this.searchHistory[searchString]) {
        console.debug('action: newSearch: New search!');
        // Update the query in search options
        this.searchOptions.q = activeSearch.value;
        console.debug('action: newSearch: calling giphy with', this.searchOptions);
        void giphy.search(this.searchOptions).then((res) => {
          console.debug('action: runSearch: results:', res);
          this.activeResults = res;
          this.searchHistory[this.searchOptions.q] = res;
        }).catch((err) => {
          // Something went wrong!
          console.error('Broke while trying to search Giphy\n', err);
          $q.notify({
            group: false,
            progress: true,
            type: 'negative',
            message: 'Something went wrong trying to search Giphy...',
          });
        });
      } else {
        console.debug('action: newSearch: OLD search!');
        // WE'RE ALREADY HOLDING THE SPHERE
        this.activeResults = this.searchHistory[searchString];
      }
      // Clear active gif list
      const gifStore = useGifStore();
      gifStore.clear();
      console.debug('gifStore', gifStore.activeIds);
      // Hide all dialogs
      showHistory.value = false;
      showSettings.value = false;
    },
  },
});
