<template>
	<v-container>
	  <v-row>
		<v-col v-for="hotel in selectedHotels" :key="hotel.id" cols="12" md="4">
		  <v-card>
			<v-card-title>{{ hotel.name }}</v-card-title>
			<v-card-subtitle>Preço: {{ hotel.price }} - Avaliação: {{ hotel.rating }}</v-card-subtitle>
		  </v-card>
		</v-col>
	  </v-row>
	</v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { Hotel } from '../types'
  
  export default defineComponent({
	name: 'CompareHotels',
	props: {
	  selectedHotels: {
		type: Array as PropType<Hotel[]>,
		required: true
	  }
	}
  })
  </script>
  
  <style scoped>
  </style>
  