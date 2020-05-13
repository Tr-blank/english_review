import Vue from 'vue';
import VueGAPI from 'vue-gapi';
import App from './App.vue';
import router from './router';

const apiConfig = {
  apiKey: 'AIzaSyACNn34d_0HbnqjlJuGXIQ9236rVuSs0Fs',
  clientId: '857737946613-e4dqck47oibm9let47m7ad30n5mgklk3.apps.googleusercontent.com',
  // apiKey: 'AIzaSyAY4THLuVYiFhrRAPZCseQDbCO3bxNJD9A',
  // clientId: '624530488961-chtl120tenn14g9i8elqlj5m49888nau.apps.googleusercontent.com',
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  scope: 'https://www.googleapis.com/auth/spreadsheets', // See, edit, create, and delete your spreadsheets in Google Drive
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
};

// Use the plugin and pass along the configuration
Vue.use(VueGAPI, apiConfig);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
