<template>
  <div class="alldiv">
    <webapp-header />
    <router-view class="router"></router-view>
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
html, body, #app {
  height: 100%;
  margin: 0;
  flex-direction: column;
}
router-view {
  flex: 1;
  padding:10px;
  padding-bottom:80px;
}
.alldiv {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
.router {
  flex: 1;
}

</style>
