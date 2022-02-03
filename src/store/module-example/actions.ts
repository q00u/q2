import { ActionTree } from 'vuex';
import { StateInterface } from '../oldindex';
import { ExampleStateInterface } from './state';

const actions: ActionTree<ExampleStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default actions;
