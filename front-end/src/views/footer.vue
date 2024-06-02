<template>
    <footer>
      <div class="footer-content">
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
  
  footer {
    background-color: red;
    padding: 0;
    margin: 0;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    position: relative;
    bottom: 0;
    width: 100%;
  }
  
  .footer-content-prof {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  
  .description {
    margin-right: auto; /* Setze das Margin auf auto, um die Beschreibung ganz links zu positionieren */
  }
  
  .easiLogo {
    width: 100px;
    height: auto;
    order: 1; /* Ändere die Reihenfolge, um die Beschreibung ganz links zu positionieren */
  }
  
  </style>