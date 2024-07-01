<template>
	<v-container>
	  <v-form @submit.prevent="searchHotels">
		<v-row>
		  <v-col cols="12" md="4">
			<v-select
			  v-model="destination"
			  :items="states"
			  item-text="name"
			  item-value="name"
			  label="Destino"
			  outlined
			  required
			></v-select>
		  </v-col>
		  <v-col cols="12" md="3">
			<v-text-field
			  v-model="checkIn"
			  label="Check-in"
			  type="date"
			  outlined
			  required
			></v-text-field>
		  </v-col>
		  <v-col cols="12" md="3">
			<v-text-field
			  v-model="checkOut"
			  label="Check-out"
			  type="date"
			  outlined
			  required
			></v-text-field>
		  </v-col>
		  <v-col cols="12" md="1">
			<v-text-field
			  v-model="rooms"
			  label="Quartos"
			  type="number"
			  min="1"
			  outlined
			  required
			></v-text-field>
		  </v-col>
		  <v-col cols="12" md="1">
			<v-text-field
			  v-model="guests"
			  label="Hóspedes"
			  type="number"
			  min="1"
			  outlined
			  required
			></v-text-field>
		  </v-col>
		</v-row>
		<v-row>
		  <v-col cols="12" md="12">
			<v-btn type="submit" color="primary" class="mb-10">Pesquisar</v-btn>
		  </v-col>
		</v-row>
	  </v-form>
	</v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import { fetchStates } from '../services/apiService'
  
  export default defineComponent({
	name: 'SearchComponent',
	data() {
	  return {
		destination: '',
		checkIn: '',
		checkOut: '',
		rooms: 1,
		guests: 1,
		states: [] as { id: number, name: string, abbreviation: string }[]
	  }
	},
	async created() {
	  const states = await fetchStates()
	  console.log('Fetched states:', states)
	  this.states = states
	},
	methods: {
	  searchHotels() {
		console.log('Search criteria:', {
		  destination: this.destination,
		  checkIn: this.checkIn,
		  checkOut: this.checkOut,
		  rooms: this.rooms,
		  guests: this.guests,
		})
		this.$emit('search', {
		  destination: this.destination,
		  checkIn: this.checkIn,
		  checkOut: this.checkOut,
		  rooms: this.rooms,
		  guests: this.guests,
		})
	  }
	}
  })
  </script>
  
  <style scoped>
  .v-form {
	display: flex;
	flex-direction: column;
	align-items: center;
  }
  </style>
  