<template>
  <form @submit.prevent="register">
    <input v-model="email" type="email" placeholder="Correo" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <button type="submit">Registrarse</button>
    <p v-if="error">{{ error }}</p>
    <p v-if="success">¡Registro exitoso! Ya puedes iniciar sesión.</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref(false)

const register = async () => {
  const { error: err } = await useFetch('http://localhost:3000/auth/register', {
    method: 'POST',
    body: {
      email: email.value,
      password: password.value,
    },
  })

  if (err.value) {
    error.value = 'El registro falló. ¿Ya existe este correo?'
    success.value = false
  } else {
    error.value = ''
    success.value = true
  }
}
</script>
