<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  created () {
    this.$logger.print(this.$LogLevel.ERROR, 'App', 'MyError')
    this.$logger.print(this.$LogLevel.WARN, 'App', 'MyWarn')
    this.$logger.print(this.$LogLevel.INFO, 'App', 'MyInfo')
    this.$logger.print(this.$LogLevel.DEBUG, 'App', 'MyDebug')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
