<template lang="pug">
  .flex
    aside.aside
      .aside__title 顯示
      .py-2.pl-4(@click="clickViewStyleControl('table')" :class="{'bg-grey': viewStyle === 'table'}") 表格
      .py-2.pl-4(@click="clickViewStyleControl('list')" :class="{'bg-grey': viewStyle === 'list'}") 詳細
      .aside__title 篩選
      .filter__category tags
      .pl-4.pl-8(v-for="tag in tags")
        input(
          type="checkbox"
          :id="filterList[tag]"
          :value="tag"
          v-model="filterTags"
          @change="filterEvent()"
        )
        label.filter__item(:for="filterList[tag]") {{tag}}
      .filter__category 來源
      .pl-4.pl-8(v-for="origin in origins")
        input(
          type="checkbox"
          :id="filterList[origin]"
          :value="origin"
          @change="filterEvent()"
          v-model="filterOrigins"
        )
        label.filter__item(:for="filterList[origin]") {{origin}}
    div.content(:class="viewStyleClass")
      Nav
      section.list(v-for="item in viewList")
        h3.list__title {{item.origin}}
        .list__row
          .list__column(v-for="word in item.words")
            span.list__english {{word.english}}
            a.list__chinese(:href="word.google" target="_blank") {{word.chinese}}
</template>

<script>
import axios from 'axios';
import Nav from '@/components/Nav.vue';

export default {
  name: 'Word',
  components: {
    Nav,
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

<style lang="stylus" scoped>
.aside
  width: 200px;
  @apply text-left bg-grey-dark;
  &__title
    @apply px-4 pt-4 text-xl font-semibold;
.filter
  &__item
    @apply px-4 py-2 inline-block;
  &__category
    @apply px-4 font-semibold pt-2;
.content
  width: calc(100% - 200px);
.list
  font-family: Menlo, Monaco, "Courier New", monospace, Avenir, Helvetica, Arial, sans-serif;
  @apply pb-8 text-left leading-8 pl-8 pt-4;
  &__title
    @apply pb-2 text-xl font-semibold;
  &__row
    @apply flex flex-wrap border-b border-grey border-solid;
  &__column
    @apply block relative font-semibold;
    & ^[-1]__chinese
      @apply pl-4;
  &-view--table
    & ^[-1]__column
      flex: 0 0 300px;
    & ^[-1]__english:hover
      & + ^[-2]__chinese
        top: 100%;
        @apply block;
    & ^[-1]__chinese
      top: 0;
      @apply text-grey-light absolute left-0 px-2 hidden border border-grey-light border-solid bg-grey-dark z-10;
  &-view--list
    & ^[-1]__column
      width: 100%;
</style>
