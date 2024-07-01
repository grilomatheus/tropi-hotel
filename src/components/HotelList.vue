<template>
	<v-container>
	  <v-row>
		<v-col v-for="hotel in hotels" :key="hotel.id" cols="12" md="4">
		  <v-card>
			<v-card-title>{{ hotel.name }}</v-card-title>
			<v-card-subtitle>Preço: {{ hotel.price }} - Avaliação: {{ hotel.rating }}</v-card-subtitle>
			<v-card-actions>
			  <v-btn @click="selectHotel(hotel)">Comparar</v-btn>
			  <v-btn @click="reserveHotel(hotel)">Reservar</v-btn>
			</v-card-actions>
		  </v-card>
		</v-col>
	  </v-row>
	</v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType, watch } from 'vue'
  import { Hotel } from '../types'
  
  export default defineComponent({
	name: 'HotelList',
	props: {
	  hotels: {
		type: Array as PropType<Hotel[]>,
		required: true
	  }
	},
	watch: {
	  hotels(newHotels) {
		console.log('Received hotels:', newHotels)
	  }
	},
	methods: {
	  selectHotel(hotel: Hotel) {
		this.$emit('select-hotel', hotel)
	  },
	  reserveHotel(hotel: Hotel) {
		this.$emit('reserve-hotel', hotel)
	  }
	}
  })
  </script>
  
  <style scoped>
  </style>
  