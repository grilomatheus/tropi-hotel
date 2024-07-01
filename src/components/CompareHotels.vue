<template>
	<v-container>
		<v-row>
			<v-col v-for="hotel in selectedHotels" :key="hotel.id" cols="12" md="4">
				<v-card>
					<v-card-title>{{ hotel.name }}</v-card-title>
					<v-card-subtitle>Diárias a partir de R${{ hotel.price }} </v-card-subtitle>
					<v-card-subtitle>Avaliação: {{ hotel.rating }}</v-card-subtitle>
					<v-card-text>
						<p>Estado: {{ hotel.state }}</p>
						<p>Cidade: {{ hotel.city }}</p>
						<p>WiFi: {{ hotel.wifi ? 'Sim' : 'Não' }}</p>
						<p>Estacionamento: {{ hotel.parking ? 'Sim' : 'Não' }}</p>
						<p>Piscina: {{ hotel.pool ? 'Sim' : 'Não' }}</p>
						<p>Restaurante: {{ hotel.restaurant ? 'Sim' : 'Não' }}</p>
						<p>Spa: {{ hotel.spa ? 'Sim' : 'Não' }}</p>
						<p>Academia: {{ hotel.gym ? 'Sim' : 'Não' }}</p>
						<p>Quarto Familiar: {{ hotel.family_room ? 'Sim' : 'Não' }}</p>
						<p>Acessibilidade: {{ hotel.accessibility ? 'Sim' : 'Não' }}</p>
						<p>Hidromassagem: {{ hotel.hot_tub ? 'Sim' : 'Não' }}</p>
						<p>Permite Animais: {{ hotel.pets_allowed ? 'Sim' : 'Não' }}</p>
						<p>Café da Manhã: {{ hotel.breakfast_included ? 'Sim' : 'Não' }}</p>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import type { Hotel } from '../types'

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

<style scoped></style>