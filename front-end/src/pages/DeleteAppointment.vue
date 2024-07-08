<template>
  <div class="delete-appointment-container">
    <div v-if="isLoading" class="loading-screen">
      <p>Loading...</p>
    </div>
    <div style="color: black;" v-else>
      <h1>Termin gelöscht !</h1>
      <p>Ihr Termin wurde erfolgreich gelöscht.</p>
      <p>Sie werden in Kürze zur Startseite weitergeleitet...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteAppointment',
  data() {
    return {
      appointmentId: this.$route.params.appointmentId,
      isLoading: true
    };
  },
  mounted() {
    this.deleteAppointment();
  },
  methods: {
    async deleteAppointment() {
      try {
        const response = await fetch(`/api/appointments/${this.appointmentId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete appointment');
        }
        console.log('Appointment deleted successfully');
      } catch (error) {
        console.error('Error deleting appointment:', error);
      } finally {
        this.isLoading = false;
        setTimeout(() => {
          this.$router.push('/');
        }, 2000); 
      }
    }
  }
};
</script>

<style scoped>
.delete-appointment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.loading-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.loading-screen p {
  font-size: 2em;
  color: #000;
}

.delete-appointment-container h1 {
  color: #000;
  margin-bottom: 20px;
}

.delete-appointment-container p {
  font-size: 1.2em;
}
</style>
