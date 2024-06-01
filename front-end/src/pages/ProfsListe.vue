
<template>
  <header>
    <div class="container header-container">
      <h3 class="header-title">Sprechstunde einfach buchen.</h3>
    </div>
  </header>

  <section class="hero">
    <img class="hero-image" src="../assets/img/hs-bo-startseiteBild.jpg" alt="Header Image" />
    
    <div class="search-box">
      <input id="fileno" type="text" class="search-input" placeholder="Suchen . . ."/>
    </div>
    <img class="logo" src="../assets/img/ProfDirektLogo (1).png" alt="Logo" />
  </section>

<section class="ueber-professor">
  <h1 class="ueberschrift" >PROFESSOREN</h1>
</section>

  <section class="professor-cards">
    <div v-for="prof in profs" :key="prof.id" class="card">
      <card-header class="card-logo">
        <img class="bo-logo" src="../assets/img/logoBO.png" alt="">
      </card-header>
      <img :src="prof.imageName" class="card-img-top rounded-circle" S alt="Professor Image" />
      
      <div class="card-body">
        <h3 class="card-title">{{ prof.name }}</h3>
        <router-link :to="{ path: '/profs/' + prof.id }" class="btn btn-primary btn-hover-green">Auswählen</router-link>
      </div>

      
    </div>
  </section>
  <section>
  <footer>
    <div class="footer-content">
      <h6 class="description">Company Description</h6>
      <img class="easiLogo" src="../assets/img/firmenLogo_EASI (1).png" alt="EasiLogo">
    </div>
  </footer>
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
  background-color: red; /* Red background color */
  padding: 0%;
  /*padding-bottom: 0%;*/
  margin: 0;
  text-align: center;
  height: 50px;
  box-shadow: 10px 4px 20px rgb(53, 50, 50);

}

.header-container{
  margin-right:0;
  margin-left: auto;
}

.header-title{
  font-size: 2rem;
  color: #ffffff;
  float: right;
  
  
}
.ueberschrift{
  color: black;
  margin-right:auto;
  margin-left: auto;
  display: flex; /* Arrange professor cards horizontally */
  flex-wrap: wrap; /* Wrap cards to fit container width */
  justify-content: center;
  margin: 2rem 0; /* Add some margin around cards */
  font-weight: bold; /* Make text bold */
  

}
.hero {
  position: relative;
  margin: 0;
  padding: 0;
}

.hero-image {
  padding: 0%;
  width: 100%;
  height: 400px; /* Adjust hero image height as needed */
  object-fit: cover;
  filter: brightness(60%);
  margin: 0;
  box-shadow: 0px 4px 20px rgb(104, 97, 97);

}

.search-box {
  position: absolute;
  bottom: 150px; /* Adjust search bar position as needed */
  left: 80%;
  transform: translateX(-50%);
  /*background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  padding: 10px;
  border-radius: 10px;
  height: 30%;
  display:flex;
  align-items: center;
  
}
.search-input {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 20px;
  font-size: smaller;
  background-color: #fff; /* White background for input field */
  color:black; /* Black text color for input field */
  height: 40%;
  box-shadow: 10px 4px 20px rgb(56, 53, 53);

  
}


.logo {
  position: absolute;
  top: 20px;
  left: 20px;
  /* Adjust logo size as needed */
  width: 350px; /* Example size */
  height: auto; /* Maintain logo aspect ratio */
  
}

.professor-cards {
  display: flex; /* Arrange professor cards horizontally */
  flex-wrap: wrap; /* Wrap cards to fit container width */
  justify-content: center;
  margin: 2rem 0; /* Add some margin around cards */

}

.card {
  /*margin: 1rem;  Add margin between cards */
  /* width: 250px; Adjust card width as needed */
 /* border: 2px solid black;*/
 box-shadow: 15px 10px 30px gray ;

  background-color: black;  
  background: #ffffff; /* Card background color */
 /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
  border-radius: 10px; /* Rounded corners */
  margin: 1rem; /* Add margin between cards */
  width: 250px; /* Adjust card width as needed */
  overflow: hidden; /* Prevent image overflow */
  transition: transform 0.2s; /* Smooth hover effect */
}

.card-logo{
  margin-left: 5%;
  margin-top: 5%;

}
.bo-logo{
  width: 50px; /* Du kannst die Größe nach Bedarf anpassen */
  height: auto;
  order: 1; /* Ändere die Reihenfolge, um die Beschreibung ganz links zu positionieren */}


.card-img-top {
 /* height: 150px;  Set height for professor image */
 /* object-fit: cover;*/
  width: 70%; /* Ensure image fills the width of the card */
  height: 50%; /* Set height for professor image */
  object-fit: cover; /* Cover the card area */
  border-top-left-radius: 10px; /* Rounded image corners */
  border-top-right-radius: 10px; /* Rounded image corners */
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  margin-bottom: 5%;
 /* border: 2px solid black;*/
  box-shadow: 10px 5px 5px rgb(163, 158, 158) ;

}
.card-title{
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;
  display: flex;
  
}



.btn-hover-green:hover {
  background-color: gray; /* Change to your desired green shade */
  border-color: gray; /* Change border color if needed */
}

.btn-primary {
  
  /*background-color: #c60000;  Red button color */
 /* border-color: #c60000;  Red button border */
  background-color: red; /* Red button color */
  border-color:red; /* Red button border */
  color: #fff; /* Button text color */
  padding: 0.5rem 1rem; /* Button padding */
  font-size: 1rem; /* Button font size */
  border-radius: 20px; /* Rounded button corners */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.2s, border-color 0.2s; /* Smooth transition */
  margin-bottom: 0%;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 60%;
  box-shadow: 10px 5px 10px rgb(109, 106, 106) ;

  

}
footer {
  background-color: red; /* Red background color */
  padding: 0;
  margin: 0;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /*padding-bottom: 0%;*/
  text-align: center;
  margin-bottom: 0; /* Hier wird der Abstand nach unten entfernt */
  box-shadow: 10px 1px 20px rgb(104, 97, 97);


}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.description {
  margin-right: auto; /* Setze das Margin auf auto, um die Beschreibung ganz links zu positionieren */
}

.easiLogo {
  width: 100px; /* Du kannst die Größe nach Bedarf anpassen */
  height: auto;
  order: 1; /* Ändere die Reihenfolge, um die Beschreibung ganz links zu positionieren */

}



</style>