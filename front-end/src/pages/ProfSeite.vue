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
                    <h5 class="btn-date">{{ timeSlot.displayDate }}</h5>
                  </div>
                  <div class="card-body-time">
                    <div class="time-detail">
                      <span>{{ timeSlot.start }} - {{ timeSlot.end }}</span>
                      <span v-if="timeSlot.booked" class="status gebucht">gebucht</span>
                      <button 
                        v-else 
                        class="btn-time buchen" 
                        @click="openModalWithSlot(timeSlot)">
                        Buchen
                      </button>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="back-link-container">
        <a href="/" class="back-link">« zurück</a>
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
                <label for="studentName">Vor- und Nachnamen</label>
                <input type="text" class="form-control" id="studentName" v-model="studentName" required />
              </div>
              <div class="form-group">
                <label for="matrikelNumber">Matrikelnummer</label>
                <input type="text" class="form-control" id="matrikelNumber" v-model="matrikelNumber" required />
              </div>
              <div class="form-group">
                <label for="email">E-Mail Adresse</label>
                <input type="email" class="form-control" id="email" v-model="email" required />
              </div>
              <div class="form-group">
                <label for="topic">Anliegen</label>
                <input type="text" class="form-control" id="topic" v-model="topic" required />
              </div>
             
              
              <div class="text-center">
                <button type="submit" class="btn-senden">Absenden</button>
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
      studentName: "",
      matrikelNumber: "",
      selectedTimeSlot: null,
      showModal: false,
      processedTimeSlots: [],
      appointments: [] // New property to store existing appointments
    };
  },
  created() {
    axios
      .get(`/api/professor/${this.$route.params.profId}`)
      .then((response) => {
        this.prof = response.data;
        this.fetchAppointments();  // Fetch appointments after getting professor data
      })
      .catch((error) => {
        console.error("Err :", error);
      });
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.selectedTimeSlot = null;
      this.email = "";
      this.topic = "";
      this.studentName = "";
      this.matrikelNumber = "";
    },
    openModalWithSlot(timeSlot) {
      this.selectedTimeSlot = timeSlot;
      this.showModal = true;
    },
    async bookAppointment() {
      if (!this.selectedTimeSlot) {
        alert('Bitte wählen Sie ein Zeitfenster aus.');
        return;
      }
      const appointmentData = {
        object: this.topic,
        datum: this.selectedTimeSlot.formattedDate,
        start: this.selectedTimeSlot.start,
        ende: this.selectedTimeSlot.end,
        studentName: this.studentName,
        professorName: `${this.prof.titel} ${this.prof.vorname} ${this.prof.nachname}`,
        matrikelNumber: this.matrikelNumber,
        studentEmail: this.email,
        raum: this.prof.raum // Add room to appointment data
      };

      try {
        await axios.post('/api/appointments', appointmentData);
        alert('Buchung erfolgreich! Sie erhalten eine Bestätigung per E-Mail.');
        this.closeModal();
        this.fetchAppointments();
      } catch (error) {
        console.error('Fehler bei der Buchung des Termins:', error);
        alert('Fehler beim Buchen des Termins.');
      }
    },
    fetchAppointments() {
      axios
        .get(`/api/appointments/professor/${this.prof.titel} ${this.prof.vorname} ${this.prof.nachname}`)
        .then((response) => {
          this.appointments = response.data;
          this.processTimeSlots();
        })
        .catch((error) => {
          console.error('Fehler beim Abrufen der Termine:', error);
        });
    },
    processTimeSlots() {
    const daysOfWeek = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
    const slots = [];
    const today = new Date();
    const currentDay = getDay(today);

    const startOfSecondWeek = currentDay === 6 || currentDay === 0
      ? startOfWeek(addWeeks(today, 2), { weekStartsOn: 1 })
      : startOfWeek(addWeeks(today, 1), { weekStartsOn: 1 });

    this.prof.sprechstunde.forEach(slot => {
      const dayIndex = slot.day - 1; 
      const dayName = daysOfWeek[dayIndex];

      for (let weekOffset = 0; weekOffset < 2; weekOffset++) {
        const dayDate = addDays(addWeeks(startOfSecondWeek, weekOffset), dayIndex);
        const formattedDate = format(dayDate, 'dd-MM-yyyy');
        const startTime = this.convertToMinutes(slot.start);
        const endTime = this.convertToMinutes(slot.ende);
        for (let time = startTime; time < endTime; time += 60) {
          const slotObj = {
            dayName,
            date: dayDate,
            formattedDate,
            start: this.convertToTimeFormat(time),
            end: this.convertToTimeFormat(time + 60),
            booked: this.isBooked(formattedDate, this.convertToTimeFormat(time)) 
          };
          slots.push(slotObj);
        }
      }
    });
    slots.sort((a, b) => a.date - b.date);
    this.processedTimeSlots = slots.map(slot => ({
      ...slot,
      displayDate: `${slot.dayName} ${slot.formattedDate}`
    }));
  },
    isBooked(date, start) {
      return this.appointments.some(appointment => appointment.datum === date && appointment.start === start);
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

<style>
/* General Styles */
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
  color: red;

}
a[href^="mailto:"]{ 
  color: red;
}
.card-title {
  color: black;
  font-weight: bold;
  text-align: center;

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
  margin-right: 10%;

}
.btn-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card-time {
  border-radius: 15px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  box-shadow: 10px 4px 10px gray;
  margin-left: 0%;
}
.card-header-time {
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: black;
  display: flex;
  justify-content: center; 
  align-items: center; 
  text-align: center;      

}
.card-header-time :hover{
  background-color: #bdb6b6;
}
.card-body-time {
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: 1.5rem;       
  /*font-weight: bold;*/
  display: flex;
  justify-content: center; 
  align-items: center; 
  text-align: center;   
  height: 100px; 
  margin-top: -10px;

}
.btn-date {
  width: 100%;
  background-color: #bdb6b6;
  color: black;
  border: none;
  padding: 10px;
  border-radius: 30px;
  /*box-shadow: 10px 4px 20px rgb(104, 97, 97);*/
}
.btn-time {
  width: 100%;
  background-color: rgb(9, 156, 9);
  color: white;
  border: none;
  padding: 10px;
  margin: 5px 0;
  box-shadow: 10px 4px 20px rgb(155, 151, 151);
  border-radius: 30px;
}
.btn-time:hover {
  background-color: darkgreen;
}

.gebucht {
  background-color: rgb(100, 98, 98);
  box-shadow: 10px 4px 20px rgb(155, 151, 151);
  color: white;
  padding: 10px;
  border-radius: 30px;
  display: inline-block;
  width: 100%;
  border: none;
  margin: 5px 0;
}
.time-detail {
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.back-link-container {
  display: flex;
  justify-content: flex-start; 
  padding: 10px;
  margin-left: 10px; 
}

.back-link {
  font-size: 1.5rem;           
  color: #000;               
  text-decoration: none;     
}

.back-link:hover {
  text-decoration: underline; 
}

/* Modal Styles */
.modal-dialog {
  border-radius: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.modal-header {
  background-color:red;
  color: white;
}
.form-control{
  box-shadow: 2px 2px 2px gray;
}
.close {
  color: black;
  border-radius: 50%;
  width: 5%;
  border: none;
  box-shadow: 4px 4px 10px gray;
  position: absolute;
  top: 10px;
  right: 10px;
}
.btn-senden {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 5%;
}
.btn-senden:hover {
  background-color: darkred;
}
.page-wrap {
  padding: auto;
  padding-left: 0%;
  width: 100%;
  min-height: 1000px;
  margin-bottom: -140px;
}
.backbutton{
  margin-left: 0%;
  margin-top: 5%;
  margin-right: 0%;
}
.btn-back {
  background-color: #bdb6b6;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 4px 4px 10px gray;
  margin-left: 2%;
}
.btn-back:hover {
  background-color: darkgrey;
}



@media (min-width: 1400px) {
    .container, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
        max-width: 1600px;
    }
}
</style>
