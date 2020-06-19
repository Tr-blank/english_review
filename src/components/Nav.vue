<template lang="pug">
  .nav
    router-link.nav__item(to="/") Home
    router-link.nav__item(to="/Word") Word
</template>

<script>
export default {
  name: 'Nav',
  // props: {
  //   msg: String,
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.nav
  &__item
    @apply inline-block py-1 px-6 text-sm bg-grey-dark border-l-2 border-grey-darker;
</style>
