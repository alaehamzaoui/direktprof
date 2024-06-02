<template>
  <div class="container mt-4" v-if="prof">
    <div class="row">
      <div class="col-sm">
        <div class="card mb-4">
          <img :src="require(`../assets/${prof.imageUrl}`)" class="card-img-top rounded-circle" alt="Professor Bild" />
          <div class="card-body bg-white text-danger">
            <div class="profile-card">
              <h5 class="card-title">{{ prof.titel }} {{ prof.vorname }} {{ prof.nachname }}</h5>
              <p>Fachbereich Elektrotechnik und Informatik</p>
              <p><i class="fas fa-phone"></i> {{ prof.telefonnummer }}</p>
              <p><i class="fas fa-map-marker-alt"></i> {{ prof.raum }}</p>
              <p><i class="fas fa-envelope"></i> {{ prof.email }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm">
        <div class="appointments">
          <h4 class="h4-card-appointment-title">Bitte wählen Sie einen Termin aus!</h4>
          <div class="btn-grid">
            <div class="row" v-for="(sprechstunde, index) in prof.sprechstunde" :key="index">
              <div class="col">
                <div class="card-time">
                  <div class="card-header-time">
                    <h5 class="btn-date btn-primary m-2">{{ sprechstunde.day }}</h5>
                  </div>
                  <div class="card-body-time">
                    <button class="btn-time btn-primary m-2">
                      <tr>
                        <td>{{ sprechstunde.start }}</td>
                        <td>-</td>
                        <td>{{ sprechstunde.ende }}</td>
                      </tr>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <button class="btn-buchen btn-primary m-2" @click="showModal = true">
                  <h5>Auswählen</h5>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="bookingModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="bookingModalLabel">Bitte Formular ausfüllen!</h5>
            <button type="button" class="close" @click="closeModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="bookAppointment">
              <div class="form-group">
                <label for="email">E-Mail</label>
                <input type="email" class="form-control" id="email" v-model="email" required />
              </div>
              <div class="form-group">
                <label for="topic">Anliegen</label>
                <input type="text" class="form-control" id="topic" v-model="topic" required />
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
import axios from "axios";

export default {
  name: "ProfSeite",
  data() {
    return {
      prof: null,
      email: "",
      topic: "",
      showModal: false,
    };
  },
  created() {
    axios
      .get(`/api/professor/${this.$route.params.profId}`)
      .then((response) => {
        this.prof = response.data;
      })
      .catch((error) => {
        console.error("Err :", error);
      });
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    bookAppointment() {
      alert(`Termin gebucht für ${this.prof.name} mit E-Mail: ${this.email} und Thema: ${this.topic}`);
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
.profile-card {
  color: red;
}

/* Karten-Stile */
.h4-card-appointment-title {
  margin-left: 20%;
}

.btn-grid {
  display: flex; /* Arrange professor cards horizontally */
  flex-wrap: wrap; /* Wrap cards to fit container width */
  justify-content: center;
}

.card-time {
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
.btn-buchen {
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

.modal-dialog {
  border-radius: 30%;
  box-shadow: 10px 4px 15px rgb(104, 97, 97);
}
.close {
  position: absolute;
  right: 0;
  margin-right: 5%;
  border-radius: 40%;
  color: black;
  border-color: white;
  background-color: white;
}
.modal-header {
  color: white;
  background-color: #bdb6b6;
}
.btn-senden {
  background-color: red;
  color: white;
  border-color: red;
  border-radius: 10px;
  height: 50%;
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
