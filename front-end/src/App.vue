<template>
  <div class="alldiv">
    <webapp-header />
    <router-view></router-view>
    <webapp-footer />
  </div>
</template>

<script>
import footer from './views/footer.vue'
import header from './views/header.vue'

export default {
  name: 'App',
  components: {
    'webapp-header': header,
    'webapp-footer': footer
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  
}
body {
  position: sticky;
 }

.alldiv {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

router-view {
  flex: 1;
}

footer {

  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f8f9fa;
  position: fixed;
  padding-top: 10%;
  text-align: center;
}
</style>
