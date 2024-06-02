<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-sm">
        <div class="card mb-4">
          <img
            :src="prof.imageName"
            class="card-img-top rounded-circle"
            alt="Professor Bild"
          />
          <div class="card-body bg-white text-danger">
            <!-- <h5 class="card-title">{{ prof.name }}</h5>
            <p class="card-text">Sprechstunde: {{ prof.sprechstunde.tag }} von {{ prof.sprechstunde.beginn }} bis {{ prof.sprechstunde.ende }}</p>
            -->
            <div class="profile-card">
              <h5 class="card-title">{{ prof.name }}</h5>
              <p>Fachbereich Elektrotechnik und Informatik</p>
              <p><i class="fas fa-phone"></i> telefonnummer</p>
              <p>
                <i class="fas fa-map-marker-alt"></i> Campus Bochum, Raum ...
              </p>
              <p>
                <i class="fas fa-envelope"></i>
                vorname.nachname(at)hs-bochum.de
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm">
        <!--Hier sind die Termine zu sehen-->
        <div class="appointments">
          <h4 class="h4-card-appointment-title">Bitte wählen Sie einen Termin aus!</h4>
          <div class="btn-grid">
            <div class="row">
              <div class="col">
                <!--Erste Auswahl-->
                <div class="card-time">
                  <div class="card-header-time">
                    <h5 class="btn-date btn-primary m-2">Do. 25.04.2024</h5>
                  </div>
                  <div class="card-body-time">
                    <button class="btn-time btn-primary m-2">
                      <tr>
                        <td>{{ prof.sprechstunde.beginn }}</td>
                        <td>-</td>
                        <td>{{ prof.sprechstunde.ende }}</td>
                      </tr>
                    </button>
                  </div>
                </div>
              </div>

              <div class="col">
                <!--Zweite Auswahl-->
                <div class="card-time">
                  <div class="card-header-time">
                    <h5 class="btn-date btn-primary m-2">Do. 25.04.2024</h5>
                  </div>
                  <div class="card-body-time">
                    <button class="btn-time btn-primary m-2">
                      <tr>
                        <td>{{ prof.sprechstunde.beginn }}</td>
                        <td>-</td>
                        <td>{{ prof.sprechstunde.ende }}</td>
                      </tr>
                    </button>
                  </div>
                </div>
              </div>
              <div class="w-100"></div>
              <div class="col">
                <!--dritte Auswahl-->
                <div class="card-time">
                  <div class="card-header-time">
                    <h5 class="btn-date btn-primary m-2">Do. 25.04.2024</h5>
                  </div>
                  <div class="card-body-time">
                    <button class="btn-time btn-primary m-2">
                      <tr>
                        <td>{{ prof.sprechstunde.beginn }}</td>
                        <td>-</td>
                        <td>{{ prof.sprechstunde.ende }}</td>
                      </tr>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col">
                <!--vierte Auswahl-->
                <div class="card-time">
                  <div class="card-header-time">
                    <h5 class="btn-date btn-primary m-2">Do. 25.04.2024</h5>
                  </div>
                  <div class="card-body-time">
                    <button class="btn-time btn-primary m-2">
                      <tr>
                        <td>{{ prof.sprechstunde.beginn }}</td>
                        <td>-</td>
                        <td>{{ prof.sprechstunde.ende }}</td>
                      </tr>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <button 
                  class="btn-buchen btn-primary m-2"
                  @click="showModal = true"
                >
                  <h5>Auswählen</h5>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- hier muss das design bearbeitet werden 
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

     -->

      <!-- Auswähen button -->
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      aria-labelledby="bookingModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header ">
            <h5 class="modal-title" id="bookingModalLabel">Bitte Formular ausfüllen!</h5>
            <button
              type="button"
              class="close"
              @click="closeModal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="bookAppointment">
              <div class="form-group">
                <label for="email">E-Mail</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="topic">Anliegen</label>
                <input
                  type="text"
                  class="form-control"
                  id="topic"
                  v-model="topic"
                  required
                />
              </div>
              <div>
                <button type="submit" class="btn-senden">Senden</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import { profs } from "../temp-data.js";

export default {
  name: "ProfSeite",
  data() {
    return {
      prof: profs.find((prof) => prof.id === this.$route.params.profId),
      email: "",
      topic: "",
      showModal: false,
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    bookAppointment() {
      alert(
        `Termin gebucht für ${this.prof.name} mit E-Mail: ${this.email} und Thema: ${this.topic}`
      );
      this.showModal = false;
      this.email = "";
      this.topic = "";
    },
  },
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

.header-container {
  margin-right: 0;
  margin-left: auto;
}

.header-title {
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
.profile-card{
  color: red;
  
  
}

/* Karten-Stile */
.h4-card-appointment-title{
  margin-left: 20%;
}

.btn-grid{
  

  display: flex; /* Arrange professor cards horizontally */
  flex-wrap: wrap; /* Wrap cards to fit container width */
  justify-content: center;
 
}

.card-time {
  /*border: 1px solid black;*/
  
  border-radius: 5px;
  margin: 20px;
  padding: 10px;
  box-shadow: 10px 4px 20px rgb(104, 97, 97);
  border-radius: 20px;


}

.card-header-time {
  color: white;
  padding: 10px;
  padding-left: 0%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-bottom: 2%;
}

.card-body-time {
  background-color: white;
  padding: 10px;
  padding-left: 0%;
}
.btn-date {
  color: black;
  box-shadow: 10px 4px 20px rgb(104, 97, 97);

  border-color: gray;
  background-color: #bdb6b6;
  width: 100%;
  margin-left: 0%;
}
.btn-time {
  color: white;
  width: 100%;
  background-color: rgb(9, 156, 9);
  box-shadow: 10px 4px 20px rgb(104, 97, 97);

  border-color: rgb(9, 156, 9);
  border-block-color: none;

 
}

.time-slot {
  margin-bottom: 10px;
}
.btn-buchen{
  width: 80%;
  height: 80%;
  margin-left: 20%;

  display: flex; /* Arrange professor cards horizontally */
  flex-wrap: wrap; /* Wrap cards to fit container width */
  justify-content: center;
  
  
}

.action-button {
  text-align: center;
  margin-top: 10px;
}

.modal-dialog{
  border-radius: 30%;
  box-shadow: 10px 4px 15px rgb(104, 97, 97);


}
.close{
  position: absolute;
  right: 0;
  margin-right: 5%;
  border-radius: 40%;
  color: black;
  border-color: white;
  background-color: white;

}
.modal-header{
  color: white;
  background-color: #bdb6b6;

}
.btn-senden{
  background-color: red;
  color: white;

  border-color: red;
  border-radius: 10px;
  height:50%;
  width: 20%;
  margin-top: 3%;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;
  display: flex;
  box-shadow: 10px 4px 15px rgb(104, 97, 97);


}

</style>
