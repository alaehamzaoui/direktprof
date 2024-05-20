<template>
  <header >
      <div class="container">
        <h1>Sprechstunde einfach buchen.</h1>
      </div>
    </header>
      <div class="header-container">
        <img class="header-image" src="img/hs-bo-startseiteBild.jpg" alt="Header Image"/>
          <div class="card shadow">
            <div class="search-box">
              <input type="text" class="search-input" placeholder="Suchen . . . "/>
            </div>
        </div>
      </div>
    <img class="logo" src="img/ProfDirektLogo (1).png" alt="Logo" />
    <div  class = "row g-3 row-cols-1 row-cols-sm-2 row-cols-md-3">

      <div v-for="(prof, index) in professors" :key="index" class="col">
        <div class="card shadow">
          <img :src="`img/profsPic/prof${index+1}.jpg`" alt="professor">
          <div class="card-body">
            <b>{{ prof.name }}</b>
              <a :href="`./profdetail?professor=${prof.name}`" class="btn" style="background-color: red; color: white;">Termin</a>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div class="container">
        <p>&copy; 2024 ProfDirekt</p>
      </div>
    </footer>

</template>

<script>
export default {
  name: 'prof-list',
  data() {
    return {
      professors: []
    };
  },
  mounted() {
    this.fetchProfessors();
  },
  methods: {
    fetchProfessors() {
      fetch('http://localhost:3000/api/professor')
        .then(response => response.json())
        .then(data => {
          this.professors = data;
        })
        .catch(error => {
          console.error('Error fetching the professors:', error);
        });
    }
  }
}
</script>

<style>
 .profPics{
        height: 50%;
        object-fit: contain;
      }
      .row {
        height: 20%;
        object-fit: contain;
      }
      body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }

  .header-image {
    height: 100vh;
    width: 100%;
    object-fit: cover;
    background-position: center;
    filter: brightness(60%);
    position: relative;
  }
  .header-container {
    position: relative;
  }
  header {
    background-size: cover;
    background-position: center;
    background-color: red;
    color: white;
    padding: 2% 0;
  }
  
  .container {
    max-width: 90%; /* Adjust to your preference */
    margin: 0 auto; /* Center the container horizontally */
  }
  

  
  
  h1 {
    font-size: 200%;
  }
  .search-box {
    
      transform: translateY(-100px);
      background-color: var(--black);
      padding: 4px 0;
      left: 0;
      right: 0;
      padding-left: 70%;
      padding-bottom: 30%;
      max-width:500px ;
      min-width: 300px;
    

    position: absolute;
   
    bottom: 90%;
    z-index: 1000;
    align-items: right;
    justify-content: right;
  }
  .search-input {
    position: absolute;
    padding: 2%;
    border-radius: 5%;
    border: 1px solid #ccc;
    outline: none;
    width: 30%; 
    box-shadow: 0 0 1%;
    background-size: 10%;
    background-repeat: no-repeat;
    background-position: 90% center; 
    padding-left: 3%; 
    
  }
 
  .logo {
    font-size: 3vw; /* Set font size relative to viewport width */
    text-decoration: none;
    position: absolute; /* Position the logo absolutely */
    top: 300px; /* Adjust top position as needed */
    left: 2%; /* Adjust left position as needed */
  }
  
  @media only screen and (max-width: 768px) {
    /* For phone or tablet size screens */
    .logo {
      width: 60%; /* Adjust width for smaller screens */
    }
  }
  
  @media only screen and (min-width: 768px) {
    /* For larger screens */
    .logo {
      width: 30%; /* Adjust width for larger screens */
    }
  }
  
  
  
  .koehnCard{
    width: 18rem;
  }
</style>
