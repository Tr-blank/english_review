/* eslint-disable array-callback-return */
<template  lang="pug">
  div.home
    img(alt="Vue logo" src="../assets/logo.png")
    HelloWorld(msg="Welcome to Your Vue.js App")
</template>

<script>
import axios from 'axios';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  created() {
    window.googleDocCallback = function () { return true; };
    axios.get('https://spreadsheets.google.com/feeds/list/15g97v18ZaJxjDIZh_IRNuBok_sR-CrU-I1xHfsimZuM/1/public/values?alt=json')
      .then((response) => {
        // handle success
        console.log(response.data);
        // this.tourData = response.data;
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
    axios.post('https://sheets.googleapis.com/v4/spreadsheets/15g97v18ZaJxjDIZh_IRNuBok_sR-CrU-I1xHfsimZuM/values/Sheet1!A3:D5&callback=googleDocCallback',
      {
        range: 'Sheet1!A3:D5',
        majorDimension: 'ROWS',
        values: [
          ['Item', 'Cost', 'Stocked', 'Ship Date'],
          ['Wheel', '$20.50', '4', '3/1/2016'],
        ],
      })
      .then((response) => {
        // handle success
        console.log(response.data);
        // this.tourData = response.data;
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
    // this.$getGapiClient()
    //   .then((gapi) => {
    //     const params = {
    //       spreadsheetId: '189SYJL3Aw9sFlG6Jknqytg4e6Ot9JPKmXuXHmtJVB6U',
    //       range: 'A1:D2',
    //       valueRenderOption: 'FORMATTED_VALUE',
    //       dateTimeRenderOption: 'FORMATTED_STRING',
    //     };
    //     gapi.client.sheets.spreadsheets.values.get(params)
    //       .then((response) => {
    //         const data = response.result.values;
    //         console.log(data);
    //       })
    //       .catch((error) => {
    //         console.log('Error', error.message);
    //       });
    //   });
  },
};
</script>
