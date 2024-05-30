<template>
  <header>
   <div class="container header-container">
     <h3 class="header-title">Sprechstunde einfach buchen.</h3>
   </div>
 </header>

   <div class="container mt-4">
     <div class="card  mb-4">
       <img :src="prof.imageName" class="card-img-top rounded-circle" alt="Professor Bild">
       <div class="card-body bg-white text-danger">
         <h5 class="card-title">{{ prof.name }}</h5>
         <p class="card-text">Sprechstunde: {{ prof.sprechstunde.tag }} von {{ prof.sprechstunde.beginn }} bis {{ prof.sprechstunde.ende }}</p>
       </div>
     </div>

<!--andere Möglichkeit
     <div class="container-time mt-4 card-container-time">
     <div class="card-time" v-for="(card, index) in cards" :key="index">
       <div class="card-header-time">
         <h5 class="card-title-time">{{ card.title }}</h5>
       </div>
       <div class="card-body-time">
         <button class="btn-time btn-primary m-2" v-for="(button, bIndex) in card.buttons" :key="bIndex">{{ button }}</button>
       </div>
     </div>
   </div>
 -->


<div class="container mt-4 card-container">
     <!-- Karte 1 -->
     <div class="card-time">
       <div class="card-header-time">
         <h5 class="card-title-time">Do. 06.06</h5>
       </div>
       <div class="card-body-time">
         <button class="btn-time btn-success m-2">08:00 - 09:00</button>
         <button class="btn-time btn-success m-2">09:00 - 10:00</button>
         <button class="btn-time btn-success m-2">10:00 - 11:00</button>
         <button class="btn-time btn-success m-2">11:00 - 12:00</button>

         <button class="btn-buchen btn-primary m-2">Auswählen</button>

       </div>
     </div>
     <!-- Karte 2 -->
     <div class="card-time">
       <div class="card-header-time">
         <h5 class="card-title-time">Fr. 07.06</h5>
       </div>
       <div class="card-body-time">
         <button class="btn-time btn-success m-2">12:00 - 13:00</button>
         <button class="btn-time btn-success m-2">13:00 - 14:00</button>
         <button class="btn-time btn-success m-2">14:00 - 15:00</button>
         <button class="btn-time btn-success m-2">15:00 - 16:00</button>
         <button class="btn-buchen btn-primary m-2">Auswählen</button>

       </div>
     </div>
     <!-- Karte 3 -->
     <div class="card-time">
       <div class="card-header-time">
         <h5 class="card-title-time">Do. 13.06</h5>
       </div>
       <div class="card-body-time">
         <button class="btn-time btn-success m-2">16:00 - 17:00</button>
         <button class="btn-time btn-success m-2">17:00 - 18:00</button>
         <button class="btn-time btn-success m-2">18:00 - 19:00</button>
         <button class="btn-time btn-success m-2">19:00 - 20:00</button>
         <button class="btn-buchen btn-primary m-2">Auswählen</button>

       </div>
     </div>
     <!-- Karte 4 -->
     <div class="card-time">
       <div class="card-header-time">
         <h5 class="card-title-time">Fr. 14.06</h5>
       </div>
       <div class="card-body-time">
         <button class="btn-time btn-success m-2">20:00 - 21:00</button>
         <button class="btn-time btn-success m-2">21:00 - 22:00</button>
         <button class="btn-time btn-success m-2">22:00 - 23:00</button>
         <button class="btn-time btn-success m-2">23:00 - 00:00</button>
         <button class="btn-buchen btn-primary m-2">Auswählen</button>

       </div>
     </div>
   </div>



     <table class="table table-striped bg-white text-danger">
       <thead class="bg-danger text-white">
         <tr>
           <th scope="col">Tag</th>
           <th scope="col">Beginn</th>
           <th scope="col">Ende</th>
           <th scope="col">Aktion</th>

         </tr>
       </thead>
       <tbody>
         <tr>
           <td>{{ prof.sprechstunde.tag }}</td>
           <td>{{ prof.sprechstunde.beginn }}</td>
           <td>{{ prof.sprechstunde.ende }}</td>
           <td><button class="btn btn-outline-danger" @click="showModal = true">Buchen</button></td>
         </tr>
       </tbody>
     </table>
     <!-- Modal -->
     <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="bookingModalLabel" aria-hidden="true">
       <div class="modal-dialog" role="document">
         <div class="modal-content">
           <div class="modal-header bg-danger text-white">
             <h5 class="modal-title" id="bookingModalLabel">Termin buchen</h5>
             <button type="button" class="close" @click="closeModal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
           <div class="modal-body">
             <form @submit.prevent="bookAppointment">
               <div class="form-group">
                 <label for="email">E-Mail</label>
                 <input type="email" class="form-control" id="email" v-model="email" required>
               </div>
               <div class="form-group">
                 <label for="topic">Thema</label>
                 <input type="text" class="form-control" id="topic" v-model="topic" required>
               </div>
               <button type="submit" class="btn btn-danger">Senden</button>
             </form>
           </div>
         </div>
       </div>
     </div>
     <div v-if="showModal" class="modal-backdrop fade show"></div>
   </div>
   <section>
     <footer>
       <div class="footer-content-prof">
         <h6 class="description">Company Description</h6>
         <img class="easiLogo" src="../assets/img/firmenLogo_EASI (1).png" alt="EasiLogo">
       </div>
     </footer>
   </section>
   
 </template>
 
 <script>
 import { profs } from '../temp-data.js';
 
 export default {
   name: "ProfSeite",
   data() {
     return {
       prof: profs.find(prof => prof.id === this.$route.params.profId),
       email: '',
       topic: '',
       showModal: false
     };
   },
   methods: {
     closeModal() {
       this.showModal = false;
     },
     bookAppointment() {
       alert(`Termin gebucht für ${this.prof.name} mit E-Mail: ${this.email} und Thema: ${this.topic}`);
       this.showModal = false;
       this.email = '';
       this.topic = '';
     }

   }
 };
 
 </script>

 <style>

/* .appointment{
 }*/
 header {
 background-color: red; /* Red background color */
 padding: 0%;
 /*padding-bottom: 0%;*/
 margin: 0;
 text-align: center;
 height: 50px;
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

 .container {
   color: black;
 }
 .card-body {
   background-color: white;
 }
 .table {
   background-color: white;
   color: red;
 }
 .table thead {
   background-color: red;
   color: white;
 }
 .btn-outline-danger {
   border-color: red;
   color: red;
 }
 .btn-outline-danger:hover {
   background-color: red;
   color: white;
 }
 .modal-header {
   background-color: red;
   color: white;
 }
 .modal-backdrop {
   position: fixed;
   top: 0;
   left: 0;
   width: 100vw;
   height: 100vh;
   background-color: rgba(0, 0, 0, 0.5);
   z-index: 1040;
 }


 /* Karten-Stile */
.header-title {
 font-size: 2rem;
 color: #ffffff;
 float: right;
}

/* Karten-Stile */
.container-time {
 padding: 20px;
}

.card-container-time {
 display: flex;
 flex-wrap: wrap;
 gap: 20px;
 justify-content: space-around;
}

.card-time {
 border: 1px solid #ccc;
 border-radius: 5px;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 width: 200px;
 height: 300px;
 display: flex;
 flex-direction: column;
}

.card-header-time {
 background-color: #f7f7f7;
 border-bottom: 1px solid #ccc;
 padding: 10px 15px;
 border-top-left-radius: 5px;
 border-top-right-radius: 5px;
}

.card-title-time {
 margin: 0;
 border-color: gray;

}

.card-body-time {
 padding: 15px;
 display: flex;
 flex-direction: column;
 justify-content: space-around;
 border: 1px solid #ccc;

}

.btn-time {
 margin: 5px 0;
 border-radius: 0%;
 border: 1px solid #ccc;
 border-color: rgb(59, 58, 58);

}

.btn-buchen{
 color: white;
 margin-left: auto;
 margin-right: auto;
 
}



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
 width: 100px; /* Du kannst die Größe nach Bedarf anpassen */
 height: auto;
 order: 1; /* Ändere die Reihenfolge, um die Beschreibung ganz links zu positionieren */

}
 </style>
 