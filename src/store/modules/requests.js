import axios from 'axios';

export default {
  namespaced: true,
  state() {
    return {
      requests: []
    };
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
    setRequests(state, payload) {
      state.requests = payload;
    }
  },
  actions: {
    async contactCoach(context, payload) {
      const newRequest = {
        email: payload.email,
        message: payload.message
      };
      const response = await axios.post(
        `https://find-a-coach-6dd13.firebaseio.com/requests/${payload.coachId}.json`,
        newRequest
      );

      if (response.status !== 200) {
        const error = new Error('Failed to send request');
        throw error;
      }

      const responseData = response.data;
      newRequest.id = responseData.name;
      newRequest.coachId = payload.coachId;
      context.commit('addRequest', newRequest);
    },
    async getRequests(context) {
      const coachId = context.rootGetters.userId;
      const response = await axios.get(
        `https://find-a-coach-6dd13.firebaseio.com/requests/${coachId}.json`
      );
      const responseData = response.data;

      if (response.status !== 200) {
        const error = new Error('Failed to get requests');
        throw error;
      }

      console.log(responseData);
      const requests = [];
      for (const key in responseData) {
        const request = {
          id: key,
          coachId: coachId,
          email: responseData[key].email,
          message: responseData[key].message
        };
        requests.push(request);
      }

      context.commit('setRequests', requests);
    }
  },
  getters: {
    requests(state, _, _2, rootGetters) {
      const coachId = rootGetters.userId;
      return state.requests.filter(request => request.coachId === coachId);
    },
    hasRequests(_, getters) {
      return getters.requests && getters.requests.length > 0;
    }
  }
};
