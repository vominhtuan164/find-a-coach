import axios from 'axios';

export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [
        {
          id: 'c1',
          firstName: 'Minh Tuan',
          lastName: 'VO',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Tuan and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30
        },
        {
          id: 'c2',
          firstName: 'Thai Hien',
          lastName: 'TRAN',
          areas: ['frontend', 'career'],
          description:
            'I am Hien and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 30
        }
      ]
    };
  },
  mutations: {
    registerCoach(state, payload) {
      state.coaches.push(payload);
    },
    setCoaches(state, payload) {
      state.coaches = payload;
    },
    setFetchTimestamp(state) {
      state.lastFetch = new Date().getTime();
    }
  },
  actions: {
    async registerCoach(context, payload) {
      const userId = context.rootGetters.userId;
      const coachData = {
        firstName: payload.first,
        lastName: payload.last,
        description: payload.desc,
        hourlyRate: payload.rate,
        areas: payload.areas
      };

      const response = await axios.put(
        `https://find-a-coach-6dd13.firebaseio.com/coaches/${userId}.json`,
        coachData
      );

      if (!response.ok) {
        //error
      }
      context.commit('registerCoach', { ...coachData, id: userId });
    },
    async loadCoaches(context, payload) {
      if (!payload.forceRefresh && !context.getters.shouldUpdate) {
        return;
      }

      const response = await axios.get(
        'https://find-a-coach-6dd13.firebaseio.com/coaches.json'
      );

      if (response.status !== 200) {
        const error = new Error('Failed to get data from server');
        throw error;
      }
      const responseData = response.data;
      const coaches = [];

      for (const key in responseData) {
        const coach = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas
        };
        coaches.push(coach);
      }

      context.commit('setCoaches', coaches);
      context.commit('setFetchTimestamp');
    }
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
    isCoach(_, getters, _2, rootGetters) {
      const coaches = getters.coaches;
      const userId = rootGetters.userId;
      return coaches.some(coach => coach.id === userId);
    },
    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        return true;
      }

      const currentTimestamp = new Date().getTime();
      return (currentTimestamp - lastFetch) / 1000 > 60;
    }
  }
};
