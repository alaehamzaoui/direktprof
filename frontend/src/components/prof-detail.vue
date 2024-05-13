<template>
    <div>
        <div v-if="professor" class="card">
            <div class="card-header">
                <h2>{{ professor.name }}</h2>
            </div>
            <div class="card-body">
                <p><strong>Email:</strong> {{ professor.email }}</p>
                <p><strong>office:</strong> {{ professor.office }}</p>
                <p><strong>Phone:</strong> {{ professor.phone }}</p>
                <p><strong>Office Hours:</strong> {{ professor.officehours }}</p>
            </div>
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      professor: null
    };
  },
  mounted() {
    this.fetchProfessorDetails();
  },
  methods: {
    fetchProfessorDetails() {
      fetch('http://localhost:3000/api/professor/prof1')
        .then(response => response.json())
        .then(data => {
          this.professor = data;
        })
        .catch(error => {
          console.error('Error fetching the professor:', error);
        });
    }
  }
};
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  margin: 16px;
}

.card-header {
  font-size: 24px;
  margin-bottom: 16px;
}

.card-body {
  font-size: 16px;
}
</style>
