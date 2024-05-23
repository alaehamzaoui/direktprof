<template>
    <div class="container mt-4">
      <div class="card mb-4 border-danger">
        <img :src="prof.imageName" class="card-img-top" alt="Professor Bild">
        <div class="card-body bg-white text-danger">
          <h5 class="card-title">{{ prof.name }}</h5>
          <p class="card-text">Sprechstunde: {{ prof.sprechstunde.tag }} von {{ prof.sprechstunde.beginn }} bis {{ prof.sprechstunde.ende }}</p>
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
  .container {
    color: red;
  }
  .card {
    border: 1px solid red;
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
  </style>
  