<template>
  <v-container>
    <v-form @submit.prevent="reserve">
      <VRow>
        <VCol cols="12" md="4">
          <v-text-field v-model="name" label="Nome" outlined required></v-text-field>
        </VCol>
        <VCol cols="12" md="4">
          <v-text-field v-model="contact" label="Contato" outlined required></v-text-field>
        </VCol>
        <VCol cols="12" md="4">
          <v-text-field
            v-model="paymentDetails"
            label="Detalhes de Pagamento"
            outlined
            required
          ></v-text-field>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12" md="12">
          <v-btn type="submit" color="primary">Reservar</v-btn>
        </VCol>
      </VRow>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BookingRoom',
  data() {
    return {
      name: '',
      contact: '',
      paymentDetails: ''
    }
  },
  methods: {
    reserve() {
      this.$emit('reserve', {
        name: this.name,
        contact: this.contact,
        paymentDetails: this.paymentDetails
      })
    }
  }
})
</script>
