/* eslint-disable no-console */
import { defineStore } from 'pinia';
import giphyApi from 'giphy-api';

const giphy = giphyApi(process.env.PUBLIC_KEY);

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

  actions: {
    newTrending() {
      console.debug('action: trending');
      this.activeSearch = 'Trending';
      if (!this.searchHistory.Trending) {
        console.debug('action: trending: new');
        console.debug('action: trending: calling giphy with', this.searchOptions);
        void giphy.trending(this.searchOptions).then((res) => {
          console.debug('action: trending: results:', res);
          this.activeResults = res;
          this.searchHistory.Trending = res;
        }).catch((err) => {
          console.error('Broke while trying to get Trending from Giphy\n', err);
        });
      }
    },
    newSearch(searchString: string) {
      console.debug('action: newSearch');
      if (!searchString) return;
      // Make this the active search
      this.activeSearch = searchString;
      // If we haven't done this search, run it now
      if (!this.searchHistory[searchString]) {
        console.debug('action: newSearch: New search!');
        // Update the query in search options
        this.searchOptions.q = this.activeSearch;
        console.debug('action: newSearch: calling giphy with', this.searchOptions);
        void giphy.search(this.searchOptions).then((res) => {
          console.debug('action: newSearch: results:', res);
          // Res contains gif data
          this.activeResults = res;
          this.searchHistory[searchString] = res;
        }).catch((err) => {
          // Something went wrong!
          console.error('Broke while trying to search Giphy\n', err);
        });
      } else {
        console.debug('action: newSearch: OLD search!');
        // WE'RE ALREADY HOLDING THE SPHERE
        this.activeResults = this.searchHistory[searchString];
      }
    },
  },
});
