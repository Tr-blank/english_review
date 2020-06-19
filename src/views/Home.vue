<template lang="pug">
  .container
    Nav
    .word-card
      div 1/10
      div word
      div 中文
    .sentence
      div 句子
    //- div {{ viewList }}
    //- div {{ allWords }}
    .new-update
      div {{ viewList.origin }}
      .flex.flex-wrap
        div.p-2(v-for="word in viewList.words") {{word.english}}
</template>
<script>
// import axios from 'axios';
import Nav from '@/components/Nav.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    Nav,
  },
  data() {
    return {
      // allWords: [],
      origins: [],
      tags: [],
      // viewList: [],
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
  },
  mounted() {},
  methods: {
    updataViewList(filteredWords) {
      const { origin } = filteredWords[0];
      const words = filteredWords.filter((word) => word.origin === origin);
      return words.length !== 0 ? { origin, words } : {};
    },
  },
};
</script>
<style lang="stylus" scoped>
.container
  max-width: 1400px;
  @apply mx-auto;

</style>
