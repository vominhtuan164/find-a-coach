import { createStore } from 'vuex';
import CoachesModule from './modules/coaches';
import RequestsModule from './modules/requests';

const store = createStore({
  modules: {
    coaches: CoachesModule,
    requests: RequestsModule
  }
});

export default store;
