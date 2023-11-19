<template>

  <form class="form" @submit.prevent="submitForm" style="margin-left: 2rem;">
    <div>
      <label for="task-name">Nombre de tarea:</label>
      <input type="text" id="task-name" v-model="taskName" required>
    </div>
    <div>
      <label for="task-description" style="display: block; margin-bottom: 0.5rem;">Descripción de la tarea:</label>
      <textarea id="task-description" v-model="taskDescription" required style="max-width: 100%; margin-right: 0;"></textarea>
    </div>
    <div>
      <label for="task-responsible">Responsable de la tarea:</label>
      <input type="text" id="task-responsible" v-model="taskResponsible" required>
    </div>
    <div>
      <label for="task-date">Fecha de la tarea:</label>
      <input type="date" id="task-date" v-model="taskDate" required>
    </div>
    <div>
      <label for="task-type">Tipo de tarea:</label>
      <select id="task-type" v-model="taskType" required>
        <option value="" disabled>Selecciona un tipo de tarea</option>
        <option value="tipo1">Homework completion </option>
        <option value="tipo2">Practice exercises </option>
        <option value="tipo3">Preparatory homework</option>
        <option value="tipo4">Extension assignments</option>
      </select>
    </div>
    <button type="submit">Guardar tarea</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      taskName: '',
      taskDescription: '',
      taskResponsible: '',
      taskDate: '',
      taskType: ''
    }
  },
  methods: {
    submitForm() {
      console.log('Tarea guardada')
    }
  }
}
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 500px;
    margin: 0 auto;
    padding: 3rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  title {
    font-size: 2rem;
    font-weight: bold;
    color: #007aff;
    margin-left: 5rem;
  }

  label {
    font-weight: bold;
  }

  input,
  textarea,
  select {
    padding: 0.5rem;
    border-radius: 5px;
    border: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
</style>



