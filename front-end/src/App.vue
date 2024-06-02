<template>
  <div class="alldiv">
    <webapp-header/>
    <router-view> </router-view>
    <webapp-footer/>
  </div>
</template>

<script>

import footer from './views/footer.vue'
import header from './views/header.vue'

export default {
  name: 'App',
  components: {
   'webapp-header': header ,
    'webapp-footer': footer
  }
}
</script>

