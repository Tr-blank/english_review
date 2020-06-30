<template lang="pug">
  .flex
    aside.aside
      div sentence
      div word
      div update
    .content
      Nav
      .container
        .sentence
          div 句子
          div {{ randomCount }}
        .words(v-if="focusWord")
          .words__header 今日單字量：０
          .words__main.flex
            i.material-icons.p-4 chevron_left
            .words__view
              div.text-4xl {{ focusWord.english }}
              i.words__visible-button.material-icons(@click="clickVisibleIcon()")
                |{{ !isChinessVisible ? 'visibility_off' : 'visibility_on' }}
              span.words__chinese(:class="{'opacity-0': !isChinessVisible}") {{ focusWord.chinese }}
            i.material-icons.p-4(@click="nextWord()") chevron_right
            .words__list
        .new-update
          div {{ viewList.origin }}
          .flex.flex-wrap
            div.p-2(v-for="word in viewList.words") {{word.english}}
</template>
<script>
import axios from 'axios';
import Nav from '@/components/Nav.vue';
import { mapState } from 'vuex';

// https://script.google.com/macros/s/AKfycbzLQBRQz9P_673ZM3m8rtCrqaxansAKqiRr1Ze2bmU0j8w8T-Pd/exec

export default {
  name: 'Home',
  components: {
    Nav,
  },
  data() {
    return {
      randomCount: 0,
      isChinessVisible: false,
      reviewList: [],
      // focusWord: '',
    };
  },
  computed: {
    ...mapState([
      'allWords',
      'loading',
    ]),
    viewList() {
      return !this.loading ? this.updataViewList(this.allWords) : [];
    },
    focusWord: {
      get() {
        // const num = !this.loading ? this.randomHandler(this.viewList.words) : 0;
        return !this.loading ? this.viewList.words[this.randomHandler(this.viewList.words.length)] : '';
      },
      set(newWord) {
        return newWord;
      },
    },
  },
  mounted() {
  },
  methods: {
    updataViewList(filteredWords) {
      const { origin } = filteredWords[0];
      const words = filteredWords.filter((word) => word.origin === origin);
      return words.length !== 0 ? { origin, words } : {};
    },
    randomHandler(max) {
      this.randomCount = Math.floor(Math.random() * max);
      return this.randomCount;
    },
    clickVisibleIcon() {
      this.isChinessVisible = !this.isChinessVisible;
    },
    nextWord() {
      const max = this.viewList.words.lenth;
      this.randomHandler(max);
      this.focusWord = this.viewList.words[this.randomCount];
      this.isChinessVisible = false;
      this.postData();
    },
    postData() {
      const today = new Date();
      const month = today.getMonth() + 1;
      const dateString = `${today.getFullYear()}-${
        month < 10 ? `0${month}` : month
      }-${
        today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()
      }`;
      axios.get(`https://script.google.com/macros/s/AKfycbzLQBRQz9P_673ZM3m8rtCrqaxansAKqiRr1Ze2bmU0j8w8T-Pd/exec?date=${dateString}&english=${this.focusWord.english}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
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
.content
  width: calc(100% - 200px);
.container
  max-width: 1400px;
  @apply mx-auto p-8;
.words
  @apply text-xl border;
  &__header
    @apply p-2 text-sm;
  &__main
    min-height: 300px;
    @apply items-center;
  &__visible-button
    width: 30px;
    @apply  align-text-bottom text-xl cursor-pointer;
  &__chinese
    @apply text-xl align-text-bottom inline-block pl-2 leading-none;
</style>
