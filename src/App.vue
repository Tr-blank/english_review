<template lang="pug">
  main#app
    h1.header Engilsh Words Note
    router-view
</template>

<style lang="stylus">
body
  font-family: '-apple-system', BlinkMacSystemFont, PingFang TC, sans-serif;
  @apply bg-grey-darkest text-grey-lighter;
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
a
  text-decoration: none;
  color: #2c3e50;
.header
  @apply bg-grey text-grey-lighter text-center text-xs p-1 font-semibold;

</style>
