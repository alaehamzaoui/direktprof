<template>
  <header>
    <div class="container">
      <h1>Sprechstunde einfach buchen.</h1>
    </div>
  </header>

  <section class="hero">
    <img class="hero-image" src="../assets/img/hs-bo-startseiteBild.jpg" alt="Header Image" />
    <div class="search-box">
      <input type="text" class="search-input" placeholder="Suchen . . ." />
    </div>
    <img class="logo" src="../assets/img/ProfDirektLogo (1).png" alt="Logo" />
  </section>

  <section class="professor-cards">
    <div v-for="prof in profs" :key="prof.id" class="card bg-white shadow-sm">
      <img :src="prof.imageName" class="card-img-top" alt="Professor Image" />
      <div class="card-body">
        <h3 class="card-title">{{ prof.name }}</h3>
        <router-link :to="{ path: '/profs/' + prof.id }" class="btn btn-primary btn-hover-green">Auswählen</router-link>
      </div>
    </div>
  </section>
</template>
<script>
import { profs } from "../temp-data.js";
export default {
    name: "ProfsListe",
    
    data() {
        return {
            profs,
        };
    },
   
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  color: #fff; /* Set white as default text color */
}

header {
  background-color: #c60000; /* Red background color */
  padding-bottom: 0%;
  text-align: center;
}

h1 {
  font-size: 2rem;
}

.hero {
  position: relative;
}

.hero-image {
  padding: 0%;
  width: 100%;
  height: 400px; /* Adjust hero image height as needed */
  object-fit: cover;
  filter: brightness(60%);
}

.search-box {
  position: absolute;
  bottom: 20px; /* Adjust search bar position as needed */
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  padding: 10px;
  border-radius: 5px;
}

.search-input {
  width: 100%;
  padding: 5px;
  border: none;
  border-radius: 5px;
  background-color: #fff; /* White background for input field */
  color: #333; /* Black text color for input field */
}

.logo {
  position: absolute;
  top: 20px;
  left: 20px;
  /* Adjust logo size as needed */
  width: 250px; /* Example size */
  height: auto; /* Maintain logo aspect ratio */
}

.professor-cards {
  display: flex; /* Arrange professor cards horizontally */
  flex-wrap: wrap; /* Wrap cards to fit container width */
  margin: 2rem 0; /* Add some margin around cards */
}

.card {
  margin: 1rem; /* Add margin between cards */
  width: 250px; /* Adjust card width as needed */
}

.card-img-top {
  height: 150px; /* Set height for professor image */
  object-fit: cover;
}
.btn-hover-green:hover {
  background-color: green; /* Change to your desired green shade */
  border-color: green; /* Change border color if needed */
}

.btn-primary {
  
  background-color: #c60000; /* Red button color */
  border-color: #c60000; /* Red button border */
}


</style>