<script setup>
import { defineProps } from 'vue';
const props = defineProps({ users: Array });
const emit = defineEmits(['ban-user', 'edit-api']);
</script>

<template>
  <table>
    <thead>...</thead>
    <tbody>
    <tr v-for="user in users" :key="user.id">
      <td>{{ user.id }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.apiKey }}</td>
      <td>{{ user.banned ? 'Забанен' : 'Активен' }}</td>
      <td>
        <button @click="$emit('ban-user', user.id)">
          {{ user.banned ? 'Разбанить' : 'Забанить' }}
        </button>
        <button @click="$emit('edit-api', user)">
          Изменить API
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>
