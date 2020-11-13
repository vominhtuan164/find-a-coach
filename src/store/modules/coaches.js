export default {
  namespaced: true,
  state() {
    return {
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
    }
  },
  actions: {
    registerCoach(context, payload) {
      const coachData = {
        id: 'c3',
        firstName: payload.first,
        lastName: payload.last,
        description: payload.desc,
        hourlyRate: payload.rate,
        areas: payload.areas
      };
      context.commit('registerCoach', coachData);
    }
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    }
  }
};
