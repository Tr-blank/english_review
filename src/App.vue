<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="stylus">
body
  font-family: '-apple-system', BlinkMacSystemFont, PingFang TC, sans-serif;
  @apply bg-grey-darkest text-grey-lighter;
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
</style>
