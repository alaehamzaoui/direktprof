
<template>
    <div class="prof-seite">

  <section class="hero">
    <img class="hero-image" src="../assets/img/hs-bo-startseiteBild.jpg" alt="Header Image" />
   
    <div class="search-box">
      <input id="fileno" 
            type="text" 
            class="search-input" 
            placeholder="Suchen . . ."  
            v-model="searchQuery"
            @input="filterProfs"/>
    </div>
    <img class="logo" src="../assets/img/ProfDirektLogo (1).png" alt="Logo" />
  </section>
  <section class="ueber-professor">
    <h1 class="ueberschrift">PROFESSOREN</h1>
  </section>
  <section class="professor-cards" :class="{ 'search-active': filteredProfs.length > 0 }">
  <div v-if="filteredProfs.length === 0" class="no-results">
    Keine Professoren gefunden.
  </div>
  <div v-for="prof in filteredProfs" :key="prof.id" class="card">
    <img :src="require(`../assets/${prof.imageUrl}`)" class="card-img-top rounded-circle" alt="Professor Image" />
    <div class="card-body">
      <h3 class="card-title">{{ prof.vorname }} {{ prof.nachname }}</h3>
      <router-link :to="{ path: '/profs/' + prof.id }" class="btn btn-primary btn-hover-green">Auswählen</router-link>
    </div>
  </div>
</section>

<div class="empty-space"></div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfsListe",
  data() {
    return {
      profs: [],
      searchQuery: "",
    };
  },
  computed: {
    filteredProfs() {
      return this.profs.filter((prof) => {
        const searchTerm = this.searchQuery.toLowerCase();
        return (
          prof.vorname.toLowerCase().includes(searchTerm) ||
          prof.nachname.toLowerCase().includes(searchTerm)
        );
      });
    },
  },
  methods: {
    async filterProfs() {
      // This method can be used to trigger any additional filtering logic if necessary.
      // Currently, it just updates the filteredProfs computed property.
    },
  },
  async created() {
    try {
      const response = await axios.get('/api/professor');
      this.profs = response.data;
    } catch (error) {
      console.error('Es gab einen Fehler:', error);
    }
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  color: #fff; /* Set white as default text color */
}

.ueberschrift {
  color: black;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2rem 0;
  font-weight: bold;
}

.hero {
  position: relative;
  margin: 0;
  padding: 0;
}

.hero-image {
  padding: 0%;
  width: 100%;
  height: 400px;
  object-fit: cover;
  filter: brightness(60%);
  margin: 0;
  box-shadow: 0px 4px 20px rgb(104, 97, 97);
}

.search-box {
  position: absolute;
  bottom: 150px;
  left: 80%;
  transform: translateX(-50%);
  padding: 10px;
  border-radius: 10px;
  height: 30%;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 20px;
  font-size: smaller;
  background-color: #fff;
  color:black;
  height: 40%;
  box-shadow: 10px 4px 20px rgb(56, 53, 53);
}
.no-results {
  font-size: 1.2rem;
  color: black;
  text-align: center;
  width: 100%;
}
.search-active .professor-cards {
  margin-top: 2rem; 
}

.no-results {
  font-size: 1.2rem;
  color: black;
  text-align: center;
  width: 100%;
}
.logo {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 350px;
  height: auto;
}

.professor-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2rem 0;
}

.card {
  box-shadow: 15px 10px 30px gray;
  background-color: black;
  background: #ffffff;
  border-radius: 10px;
  margin: 1rem;
  width: 250px;
  overflow: hidden;
  transition: transform 0.2s;
}


.card-img-top {
  width: 70%;
  height: 50%;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  margin-bottom: 5%;
  box-shadow: 10px 5px 5px rgb(163, 158, 158);
}

.card-title {
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 150%;
}

.btn-hover-green:hover {
  background-color: gray;
  border-color: gray;
}
.btn-primary {
  background-color: red;
  border-color: red;
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 60%;
  box-shadow: 10px 5px 10px rgb(109, 106, 106);
}
.profs-liste {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}

.empty-space {
  height: 20vh; /* 15% of the viewport height */
}

</style>
