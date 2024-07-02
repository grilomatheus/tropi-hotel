<template>
  <v-container>
    <v-form ref="form" class="search-form mt-4" @submit.prevent="validateForm">
      <v-row>
        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="destination"
            :items="stateNames"
            label="Destino"
            variant="outlined"
            density="compact"
            outlined
            :rules="[rules.required]"
            placeholder="Selecione o destino..."
          />
        </v-col>
        <v-col cols="6" md="2">
          <v-text-field
            v-model="checkIn"
            label="Check-in"
            variant="outlined"
            density="compact"
            type="date"
            outlined
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="2">
          <v-text-field
            v-model="checkOut"
            label="Check-out"
            variant="outlined"
            density="compact"
            type="date"
            outlined
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="2">
          <v-text-field
            v-model="rooms"
            label="Quartos"
            variant="outlined"
            density="compact"
            type="number"
            min="1"
            outlined
            :rules="[rules.required, rules.min1]"
          ></v-text-field>
        </v-col>
        <v-col cols="6" md="2">
          <v-text-field
            v-model="guests"
            label="Hóspedes"
            variant="outlined"
            density="compact"
            type="number"
            min="1"
            outlined
            :rules="[rules.required, rules.min1]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="justify-center mb-4">
        <v-btn type="submit" color="primary">Pesquisar</v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { fetchStates } from '../services/apiService'

export default defineComponent({
  name: 'SearchBar',
  data() {
    return {
      destination: null,
      checkIn: '',
      checkOut: '',
      rooms: '',
      guests: '',
      states: [] as { id: number; name: string; abbreviation: string }[],
      stateNames: [] as string[],
      rules: {
        required: (value: string) => !!value || 'Obrigatório.',
        min1: (value: number) => value > 0 || 'Deve ser no mínimo 1.'
      }
    }
  },
  async created() {
    try {
      const states = await fetchStates()
      this.states = states
      this.stateNames = states.map((state: { name: string }) => state.name)
    } catch (error) {
      console.error('Error fetching states:', error)
    }
  },
  methods: {
    validateForm() {
      const form = this.$refs.form as any
      if (form.validate()) {
        this.searchHotels()
      }
    },
    searchHotels() {
      localStorage.setItem('checkIn', this.checkIn)
      localStorage.setItem('checkOut', this.checkOut)
      this.$emit('search', {
        destination: this.destination,
        checkIn: this.checkIn,
        checkOut: this.checkOut,
        rooms: this.rooms,
        guests: this.guests
      })
    }
  }
})
</script>
