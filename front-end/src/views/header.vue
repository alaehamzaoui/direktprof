<template>
    <header>
      <div class="container header-container">
        <h3 class="header-title">Sprechstunde einfach buchen.</h3>
      </div>
    </header>
  </template>
  
  <script>
  export default {
      name: 'Header-vue',
      components: {
        
      }
  }
  </script>
  
<style scoped>
.header-container{
  margin-right:0;
  margin-left: auto;
}

header {
  background-color: red; /* Red background color */
  padding: 0%;
  margin: 0;
  text-align: center;
  height: 50px;
}
.header-title {
  font-size: 2rem;
  color: #ffffff;
  float: right;
}

  </style>