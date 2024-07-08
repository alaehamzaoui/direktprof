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
  mounted() {
    setTimeout(() => {
      this.$router.push('/');
    }, 4000); 
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
