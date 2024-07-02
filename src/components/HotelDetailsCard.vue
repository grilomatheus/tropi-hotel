<template>
  <v-card>
    <v-card-title>{{ hotel.name }}</v-card-title>
    <v-card-subtitle>Diárias a partir de R${{ hotel.price }}</v-card-subtitle>
    <v-card-subtitle>Avaliação: {{ hotel.rating }}</v-card-subtitle>
    <v-card-text>
      <p>Estado: {{ hotel.state }}</p>
      <p>Cidade: {{ hotel.city }}</p>
      <p>Descrição: {{ hotel.description }}</p>
      <br />
      <h3>Comodidades</h3>
      <p v-if="hotel.wifi" class="d-flex align-center">
        <v-icon class="mr-2">mdi-wifi</v-icon> WiFi
      </p>
      <p v-if="hotel.parking" class="d-flex align-center">
        <v-icon class="mr-2">mdi-parking</v-icon> Estacionamento
      </p>
      <p v-if="hotel.pool" class="d-flex align-center">
        <v-icon class="mr-2">mdi-pool</v-icon> Piscina
      </p>
      <p v-if="hotel.restaurant" class="d-flex align-center">
        <v-icon class="mr-2">mdi-silverware-fork-knife</v-icon> Restaurante
      </p>
      <p v-if="hotel.spa" class="d-flex align-center"><v-icon class="mr-2">mdi-spa</v-icon> Spa</p>
      <p v-if="hotel.gym" class="d-flex align-center">
        <v-icon class="mr-2">mdi-dumbbell</v-icon> Academia
      </p>
      <p v-if="hotel.family_room" class="d-flex align-center">
        <v-icon class="mr-2">mdi-human-male-male-child</v-icon> Quarto Familiar
      </p>
      <p v-if="hotel.hot_tub" class="d-flex align-center">
        <v-icon class="mr-2">mdi-hot-tub</v-icon> Banheira de Hidromassagem
      </p>
      <p v-if="hotel.pets_allowed" class="d-flex align-center">
        <v-icon class="mr-2">mdi-paw</v-icon> Permite Animais
      </p>
      <p v-if="hotel.breakfast_included" class="d-flex align-center">
        <v-icon class="mr-2">mdi-coffee</v-icon> Café da Manhã
      </p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Hotel } from '@/types'

export default defineComponent({
  name: 'HotelDetailsCard',
  props: {
    hotel: {
      type: Object as () => Hotel,
      required: true
    }
  }
})
</script>

<style scoped>
.d-flex {
  display: flex;
  align-items: center;
}
.mr-2 {
  margin-right: 8px;
}
</style>
