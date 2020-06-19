<template lang="pug">
  .flex
    aside.aside
    div.content(:class="viewStyleClass")
      Nav
</template>
<script>
// import axios from 'axios';
import Nav from '@/components/Nav.vue';

export default {
  name: 'Home',
  components: {
    Nav,
  },
};
</script>
