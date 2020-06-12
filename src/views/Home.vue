/* eslint-disable array-callback-return */
<template  lang="pug">
  main.home
    div.w-4_5
      .text-right
        span(@click="clickViewStyleControl('table')") 背誦
        span(@click="clickViewStyleControl('list')") 詳細
      section.list(v-for="item in viewList" :class="viewStyleClass")
        .list__title {{item.origin}}
        .list__row
          .list__column(v-for="word in item.words")
            |{{word.english}}
            a.list__chinese(:href="word.google" target="_blank") {{word.chinese}}
    aside.w-1_5

</template>

<script>
import axios from 'axios';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  data() {
    return {
      allWords: [],
      origins: [],
      tags: [],
      viewList: [],
      viewStyle: 'table',
    };
  },
  computed: {
    viewStyleClass() {
      return this.viewStyle === 'table' ? 'list-view--table' : 'list-view--list';
    },
  },
  created() {
    axios.get('https://spreadsheets.google.com/feeds/list/15g97v18ZaJxjDIZh_IRNuBok_sR-CrU-I1xHfsimZuM/1/public/values?alt=json')
      .then((response) => {
        // handle success
        // this.allWords = response.data.feed.entry;
        response.data.feed.entry.forEach((word) => {
          this.allWords.push({
            id: word.gsx$id.$t,
            english: word.gsx$english.$t,
            chinese: word.gsx$chinese.$t,
            origin: word.gsx$origin.$t,
            tag: word.gsx$tag.$t,
            google: word.gsx$google.$t,
            level: word.gsx$level.$t,
          });
          if (!this.origins.includes(word.gsx$origin.$t)) this.origins.push(word.gsx$origin.$t);
          if (!this.tags.includes(word.gsx$tag.$t)) this.tags.push(word.gsx$tag.$t);
        });
        this.origins.forEach((origin) => {
          this.viewList.push({
            origin,
            words: this.allWords.filter((word) => word.origin === origin),
          });
        });
        console.log('allWords', this.allWords);
        console.log('origins', this.origins);
        console.log('viewList', this.viewList);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
    axios.get('https://spreadsheets.google.com/feeds/list/15g97v18ZaJxjDIZh_IRNuBok_sR-CrU-I1xHfsimZuM/2/public/values?alt=json')
      .then((response) => {
        // handle success
        // this.allWords = response.data.feed.entry;
        console.log(response.data.feed.entry);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  },
  methods: {
    clickViewStyleControl(key) {
      this.viewStyle = key;
    },
  },
};
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
a
  text-decoration: none;
  color: #2c3e50;
.home
  max-width: 1440px;
  @apply mx-auto flex;
.list
  @apply pb-8 text-left leading-8;
  &__title
    @apply pb-2 text-xl font-semibold;
  &__row
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #eee;
  &__chinese
    padding-left: .5rem;
    font-weight: bold;
    opacity: 0;
    color: #9aa3ad;
    transition: opacity .35s ease;
  &__column
    display: block;
    font-weight: bold;
    &:hover ^[-1]__chinese
      opacity: 1;
  &-view--table
    & ^[-1]__column
      width: 25%;
  &-view--list
    & ^[-1]__column
      width: 100%;
</style>
