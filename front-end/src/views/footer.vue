<template>
    <footer>
      <div class="footer">
        <h6 class="description"><p>&copy; 2024 ProfDirekt</p></h6>
        <img class="easiLogo" src="../assets/img/firmenLogo_EASI (1).png" alt="EasiLogo">
      </div>
    </footer>
  </template>
  <script>
  export default {
      name: 'Footer-vue',
  }
  </script>
  
<style scoped>
.description {
  float: left;
  margin-bottom: 0%;
  margin-left: 45%;
  align-items: center;
  order: 1; 
  margin-top: 1%;
}

.easiLogo {
  float: right;
  width: 100px;
  height: auto;
  order: 2; 
}
footer { 
  position: relative;
  width: 100%;
  background-color: red;
  text-align: center;
  bottom:0;
  left:0;
}
  </style>