<template>
  <div class="container mt-4 page-wrap" v-if="prof">
    <div class="row">
      <div class="col-sm-4">
        <div class="card mb-4">
          <img :src="require(`../assets/${prof.imageUrl}`)" class="card-img-top rounded-circle" alt="Professor Bild" />
          <div class="card-body">
            <h5 class="card-title">{{ prof.titel }} {{ prof.vorname }} {{ prof.nachname }}</h5>
            <p>Fachbereich Elektrotechnik und Informatik</p>
            <p><i class="fas fa-phone"></i> {{ prof.telefonnummer }}</p>
            <p><i class="fas fa-map-marker-alt"></i> Raum: {{ prof.raum }}</p>
            <p><i class="fas fa-envelope"></i> <a :href="'mailto:' + prof.email">{{ prof.email }}</a></p>
          </div>
        </div>
      </div>
      <div class="col-sm-8">
        <div class="appointments">
          <h4 class="h4-card-appointment-title">Bitte wählen Sie einen Termin aus!</h4>
          <div class="btn-grid">
            <div class="row" v-for="(timeSlot, index) in processedTimeSlots" :key="index">
              <div class="col">
                <div class="card-time">
                  <div class="card-header-time">
                    <h5 class="btn-date btn-primary m-2">{{ timeSlot.displayDate }}</h5>
                  </div>
                  <div class="card-body-time">
                    <button class="btn-time btn-primary m-2">
                      <tr>
                        <td>{{ timeSlot.start }}</td>
                        <td>-</td>
                        <td>{{ timeSlot.end }}</td>
                      </tr>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center mt-4">
            <button class="btn-buchen btn-primary" @click="showModal = true">
              <h5>Auswählen</h5>
            </button>
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
              <div class="text-center">
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

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';


import axios from 'axios';
import { format, addWeeks, startOfWeek, addDays, getDay } from 'date-fns';

export default {
  name: "ProfSeite",
  data() {
    return {
      prof: null,
      email: "",
      topic: "",
      showModal: false,
      processedTimeSlots: []
    };
  },
  created() {
    axios
      .get(`/api/professor/${this.$route.params.profId}`)
      .then((response) => {
        this.prof = response.data;
        this.processTimeSlots();
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
    processTimeSlots() {
      const daysOfWeek = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
      const slots = [];
      const today = new Date();
      const currentDay = getDay(today);

      // Determine the start of the first week to display
      const startOfFirstWeek = currentDay === 6 || currentDay === 0
        ? startOfWeek(addWeeks(today, 1), { weekStartsOn: 1 })
        : startOfWeek(today, { weekStartsOn: 1 });

      this.prof.sprechstunde.forEach(slot => {
        const dayIndex = slot.day - 1; // Convert 1-5 to 0-4 for weekdays
        const dayName = daysOfWeek[dayIndex];

        for (let weekOffset = 0; weekOffset < 2; weekOffset++) {
          const dayDate = addDays(addWeeks(startOfFirstWeek, weekOffset), dayIndex);
          /*if (isBefore(dayDate, today)) {
            continue; // Skip past dates
          }*/
          const startTime = this.convertToMinutes(slot.start);
          const endTime = this.convertToMinutes(slot.ende);
          for (let time = startTime; time < endTime; time += 60) {
            slots.push({
              dayName,
              date: dayDate,
              formattedDate: format(dayDate, 'dd-MM-yyyy'),
              start: this.convertToTimeFormat(time),
              end: this.convertToTimeFormat(time + 60)
            });
          }
        }
      });

      // Sort the slots by date
      slots.sort((a, b) => a.date - b.date);
      this.processedTimeSlots = slots.map(slot => ({
        ...slot,
        displayDate: `${slot.dayName}: ${slot.formattedDate}`
      }));
    },
    convertToMinutes(time) {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    },
    convertToTimeFormat(minutes) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    }
  }
};


</script>

<style>/* General Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body {
  height: 100%;
}
.container {
  color: black;
}

/* Profile Card Styles */
.card-body {
  background-color: white;
  text-align: left;
}
.card-title {
  color: black;
  font-weight: bold;
}
.card img {
  max-width: 150px;
  margin: 20px auto;
  border-radius: 50%;
  display: block;
}
.profile-card p {
  margin: 5px 0;
  display: flex;
  align-items: center;
}
.profile-card i {
  margin-right: 10px;
  color: red;
}
.profile-card a {
  color: red;
  text-decoration: none;
}
.profile-card a:hover {
  text-decoration: underline;
}

/* Appointment Styles */
.h4-card-appointment-title {
  text-align: center;
  margin-bottom: 20px;
}
.btn-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card-time {
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}
.card-header-time {
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: black;
}
.card-body-time {
  padding: 10px;
}
.btn-date {
  width: 100%;
  background-color: #bdb6b6;
  color: black;
  border: none;
  padding: 10px;
}
.btn-time {
  width: 100%;
  background-color: rgb(9, 156, 9);
  color: white;
  border: none;
  padding: 10px;
  margin: 5px 0;
}
.btn-buchen {
  background-color: red;
  color: white;
  border: none;
  width: 30%;
  padding: 10px 20px;
  border-radius: 5px;
}
.btn-buchen:hover {
  background-color: darkred;
}

/* Modal Styles */
.modal-dialog {
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.modal-header {
  background-color: #bdb6b6;
  color: white;
}
.close {
  color: black;
}
.btn-senden {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.btn-senden:hover {
  background-color: darkred;
}
.page-wrap {
  padding: auto;
  padding-left: 0%;
  width: 100%;
  min-height: 893px;
  margin-bottom: -140px;
}

@media (min-width: 1400px) {
    .container, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
        max-width: 1600px;
    }
}

</style>
