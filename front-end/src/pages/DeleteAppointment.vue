<template>
    <div>
      <h1>Delete Appointment</h1>
      <p v-if="message">{{ message }}</p>
      <p v-else>Deleting appointment...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        message: ''
      };
    },
    async created() {
      try {
        const appointmentId = this.$route.params.appointmentId;
        console.log(`Deleting appointment with id: ${appointmentId}`);
        const response = await axios.delete(`/api/appointments/${appointmentId}`);
        this.message = response.data.message;
      } catch (error) {
        console.error('Error deleting appointment:', error);
        this.message = 'There was an error deleting the appointment.';
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any required styles */
  </style>
  