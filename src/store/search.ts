/* eslint-disable no-console */
import { defineStore } from 'pinia';
import giphyApi from 'giphy-api';
import { useQuasar } from 'quasar';
import { useGifStore } from './gifobject';

const giphy = giphyApi(process.env.PUBLIC_KEY);
const $q = useQuasar();

export interface SearchState {
  activeSearch: string,
  activeResults: giphyApi.MultiResponse | null,
  searchHistory: { [searchQuery: string]: giphyApi.MultiResponse | null },
  searchOptions: giphyApi.SearchOptions,
}

export const useSearchStore = defineStore('Search', {
  state: ():SearchState => ({
    activeSearch: '',
    activeResults: null,
    searchHistory: {},
    searchOptions: {
      rating: 'g',
      q: '',
      limit: 24,
    },
  }),
  // TODO persist search state

  actions: {
    // Grab latest trending
    newTrending() {
      if (this.activeSearch === '') {
        console.debug('action: trending');
        this.activeSearch = 'Trending';
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
      }
    },

    newSearch(searchString: string, cached = true) {
      console.debug('action: newSearch', searchString, cached);
      if (!searchString) return;
      // Make this the active search
      this.activeSearch = searchString;
      // If we haven't done this search (or aren't caching), run it now
      if (!cached || !this.searchHistory[searchString]) {
        console.debug('action: newSearch: New search!');
        // Update the query in search options
        this.searchOptions.q = this.activeSearch;
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
    },
  },
});
