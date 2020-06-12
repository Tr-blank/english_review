/* eslint-disable array-callback-return */
<template lang="pug">
  main
    h1.header Engilsh Words Note
    .flex
      aside.w-1_5.p-4.text-left.bg-grey-dark
        .filter
          .filter__title 篩選
          .filter__category tags
          .pl-4(v-for="tag in tags")
            input(
              type="checkbox"
              :id="filterList[tag]"
              :value="tag"
              v-model="filterTags"
              @change="filterEvent()"
            )
            label.filter__item(:for="filterList[tag]") {{tag}}
          .filter__category 來源
          .pl-4(v-for="origin in origins")
            input(
              type="checkbox"
              :id="filterList[origin]"
              :value="origin"
              @change="filterEvent()"
              v-model="filterOrigins"
            )
            label.filter__item(:for="filterList[origin]") {{origin}}
      div.w-4_5.pl-8
        .text-right
          span(@click="clickViewStyleControl('table')") 背誦
          span(@click="clickViewStyleControl('list')") 詳細
        section.list(v-for="item in viewList" :class="viewStyleClass")
          h3.list__title {{item.origin}}
          .list__row
            .list__column(v-for="word in item.words")
              |{{word.english}}
              a.list__chinese(:href="word.google" target="_blank") {{word.chinese}}
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
      filterList: [],
      filterTags: [],
      filterOrigins: [],
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
    axios.get('https://spreadsheets.google.com/feeds/list/15g97v18ZaJxjDIZh_IRNuBok_sR-CrU-I1xHfsimZuM/3/public/values?alt=json')
      .then((response) => {
        // handle success
        // this.allWords = response.data.feed.entry;
        response.data.feed.entry.forEach((filter) => {
          this.filterList[filter.gsx$name.$t] = filter.gsx$id.$t;
        });
        console.log('filter', this.filterList);
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
    updataViewList(filteredWords) {
      this.viewList = [];
      this.origins.forEach((origin) => {
        const words = filteredWords.filter((word) => word.origin === origin);
        if (words.length !== 0) {
          this.viewList.push({ origin, words });
        }
      });
    },
    filterEvent() {
      if (this.filterOrigins.length !== 0 || this.filterTags.length !== 0) {
        const filterWords = [];
        this.allWords.forEach((word) => {
          if (this.filterOrigins.includes(word.origin)) {
            filterWords.push(word);
            return true;
          }
          word.tags.forEach((tag) => {
            if (this.filterTags.includes(tag)) {
              filterWords.push(word);
              return false;
            }
            return true;
          });
          return true;
        });
        this.updataViewList(filterWords);
      } else {
        this.updataViewList(this.allWords);
      }
    },
  },
};
</script>

<style lang="stylus">
a
  text-decoration: none;
  color: #2c3e50;
.header
  @apply bg-grey-dark text-grey-lighter text-center text-xs p-1 font-semibold;
.list
  font-family: Menlo, Monaco, "Courier New", monospace, Avenir, Helvetica, Arial, sans-serif;
  @apply pb-8 text-left leading-8;
  &__title
    @apply pb-2 text-xl font-semibold;
  &__row
    display: flex;
    flex-wrap: wrap;
    @apply border-b border-grey border-solid;
  &__chinese
    padding-left: .5rem;
    opacity: 0;
    transition: opacity .35s ease;
    @apply text-grey-light;
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
.filter
  &__item
    @apply p-2 inline-block;
  &__category
    @apply font-semibold pt-2;
  &__title
    @apply pb-2 text-xl font-semibold;
</style>
