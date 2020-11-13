import { createStore } from 'vuex';
import CoachesModule from './modules/coaches';
import RequestsModule from './modules/requests';

const store = createStore({
  modules: {
    coaches: CoachesModule,
    requests: RequestsModule
  },
  state() {
    return {
      userId: 'c3'
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    }
  }
});

export default store;
