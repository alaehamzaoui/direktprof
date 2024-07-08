<template>
  <div class="delete-appointment-container">
    <h1>Termin gelöscht</h1>
    <p>Ihr Termin wurde erfolgreich gelöscht.</p>
    <p>Sie werden in Kürze zur Startseite weitergeleitet...</p>
  </div>
</template>

<script>
export default {
  name: 'DeleteAppointment',
  data() {
    return {
      appointmentId: this.$route.params.appointmentId
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

.delete-appointment-container h1 {
  color: red;
  margin-bottom: 20px;
}

.delete-appointment-container p {
  font-size: 1.2em;
}
</style>
