<template>
  <form @submit.prevent="login">
    <input v-model="email" type="email" placeholder="Correo" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <button type="submit">Iniciar sesión</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const error = ref('')

const login = async () => {
  const { data, error: err } = await useFetch('http://localhost:3000/auth/login', {
    method: 'POST',
    body: { email: email.value, password: password.value },
  })

  if (err.value) {
    error.value = 'Credenciales inválidas'
  } else {
    const token = data.value.access_token
    localStorage.setItem('token', token)
    error.value = ''
    console.log('¡Login exitoso!')
    // Aquí puedes redirigir si deseas
  }
}
</script>
