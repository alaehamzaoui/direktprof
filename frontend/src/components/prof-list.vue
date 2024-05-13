<template>
    <div v-for="(prof, index) in professors" :key="index" class="col">
      <div class="card shadow">
        <img :src="`img/profsPic/prof${index+1}.jpg`" alt="professor">
        <div class="card-body">
          <b>{{ prof.name }}</b>
            <a :href="`./professor.html?professor=${prof.name}`" class="btn" style="background-color: red; color: white;">Termin</a>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      professors: []
    };
  },
  mounted() {
    this.fetchProfessors();
  },
  methods: {
    fetchProfessors() {
      fetch('http://localhost:3000/api/professor')
        .then(response => response.json())
        .then(data => {
          this.professors = data;
        })
        .catch(error => {
          console.error('Error fetching the professors:', error);
        });
    }
  }
}
</script>

<style>
 .profPics{
        height: 50%;
        object-fit: contain;
      }
      .row {
        height: 20%;
        object-fit: contain;
      }
</style>
