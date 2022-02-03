import { store } from 'quasar/wrappers';
import {
  createStore,
  Module,
  createComposable,
  Getters,
  Mutations,
} from 'vuex-smart-module';

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  searchString: string
}

class RootState {
  searchString = '';
}

class RootGetters extends Getters<RootState> {
  get searchString() {
    return this.state.searchString;
  }
}

class RootMutations extends Mutations<RootState> {
  setSearch(newSearch: string) {
    this.state.searchString = newSearch;
  }
}

// This is the config of the root module
// You can define a root state/getters/mutations/actions here
// Or do everything in separate modules
const rootConfig = {
  state: RootState,
  getters: RootGetters,
  mutations: RootMutations,
  modules: {
    //
  },
};

export const root = new Module(rootConfig);

export default store((/* { ssrContext } */) => {
  const rootStore = createStore(root, {
    strict: !!process.env.DEBUGGING,
    // plugins: []
    // and other options, normally passed to Vuex `createStore`
  });

  return rootStore;
});

export const useStore = createComposable(root);
