import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    allWords: [],
    loading: true,
  },
  getters: {
    allWords: (state) => state.allWords,
    loading: (state) => state.loading,
  },
  mutations: {
    updateAllWords: (state, words) => {
      state.allWords = words;
    },
    loadingStatus: (state, payload) => {
      state.loading = payload;
    },
  },
  actions: {
    getAllWords: async (contex) => {
      await axios.get('https://spreadsheets.google.com/feeds/list/15g97v18ZaJxjDIZh_IRNuBok_sR-CrU-I1xHfsimZuM/2/public/values?alt=json')
        .then((response) => {
          const allWords = [];
          response.data.feed.entry.forEach((word) => {
            const tags = word.gsx$tag.$t.split(',');
            allWords.push({
              id: word.gsx$id.$t,
              english: word.gsx$english.$t,
              chinese: word.gsx$chinese.$t,
              origin: word.gsx$origin.$t,
              tags,
              google: word.gsx$google.$t,
              level: word.gsx$level.$t,
            });
          });
          contex.commit('updateAllWords', allWords);
          contex.commit('loadingStatus', false);
        });
    },
  },
});

export default store;
