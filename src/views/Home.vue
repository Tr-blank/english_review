<template lang="pug">
  .container
    Nav
    .word-card
      div 1/10
      div word
      div 中文
    .sentence
      div 句子
    .new-update
      div {{viewList[0].origin}}
      .flex.flex-wrap
        div.p-2(v-for="word in viewList[0].words") {{word.english}}
</template>
<script>
import axios from 'axios';
import Nav from '@/components/Nav.vue';

export default {
  name: 'Home',
  components: {
    Nav,
  },
  data() {
    return {
      allWords: [],
      origins: [],
      tags: [],
      viewList: [],
    };
  },
  created() {
    axios.get('https://spreadsheets.google.com/feeds/list/15g97v18ZaJxjDIZh_IRNuBok_sR-CrU-I1xHfsimZuM/1/public/values?alt=json')
      .then((response) => {
        // handle success
        // this.allWords = response.data.feed.entry;
        response.data.feed.entry.forEach((word) => {
          const tags = word.gsx$tag.$t.split(',');
          this.allWords.push({
            id: word.gsx$id.$t,
            english: word.gsx$english.$t,
            chinese: word.gsx$chinese.$t,
            origin: word.gsx$origin.$t,
            tags,
            google: word.gsx$google.$t,
            level: word.gsx$level.$t,
          });
          if (!this.origins.includes(word.gsx$origin.$t)) this.origins.push(word.gsx$origin.$t);
          tags.forEach((tag) => {
            if (!this.tags.includes(tag)) this.tags.push(tag);
          });
        });
        this.updataViewList(this.allWords);
        console.log('allWords', this.allWords);
        console.log('origins', this.origins);
        console.log('tags', this.tags);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  },
  methods: {
    updataViewList(filteredWords) {
      this.viewList = [];
      this.origins.forEach((origin) => {
        const words = filteredWords.filter((word) => word.origin === origin);
        if (words.length !== 0) {
          this.viewList.push({ origin, words });
        }
      });
      console.log(this.viewList);
    },
  },
};
</script>
<style lang="stylus" scoped>
.container
  max-width: 1400px;
  @apply mx-auto;

</style>
