import { defineStore } from 'pinia';
import giphyApi from 'giphy-api';

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
    newSearch(searchString: string) {
      // eslint-disable-next-line no-console
      console.debug('action: newSearch');
      if (!searchString) return;
      // Make this the active search
      this.activeSearch = searchString;
      // If we haven't done this search, run it now
      if (!this.searchHistory[searchString]) {
        // eslint-disable-next-line no-console
        console.debug('action: newSearch: New search!');
        // Update the query in search options
        this.searchOptions.q = this.activeSearch;
        const giphy = giphyApi(process.env.PUBLIC_KEY);
        // eslint-disable-next-line no-console
        console.debug('action: newSearch: calling giphy with', this.searchOptions);
        void giphy.search(this.searchOptions).then((res) => {
          // eslint-disable-next-line no-console
          console.debug('action: newSearch: results:', res);
          // Res contains gif data
          this.activeResults = res;
          this.searchHistory[searchString] = res;
        }).catch((err) => {
          // Something went wrong!
          // eslint-disable-next-line no-console
          console.error('Broke while trying to search Giphy\n', err);
        });
      } else {
        // eslint-disable-next-line no-console
        console.debug('action: newSearch: OLD search!');
        // WE'RE ALREADY HOLDING THE SPHERE
        this.activeResults = this.searchHistory[searchString];
      }
    },
  },
});
