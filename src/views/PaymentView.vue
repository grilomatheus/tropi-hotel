<template>
	<v-container>
		<v-row>
			<v-col cols="12" md="6">
				<v-card>
					<v-card-title>{{ hotel.name }}</v-card-title>
					<v-card-subtitle>Preço: R${{ hotel.price }} diária</v-card-subtitle>
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
						<p>Banheira de Hidromassagem: {{ hotel.hot_tub ? 'Sim' : 'Não' }}</p>
						<p>Permite Animais: {{ hotel.pets_allowed ? 'Sim' : 'Não' }}</p>
						<p>Café da Manhã: {{ hotel.breakfast_included ? 'Sim' : 'Não' }}</p>
						<p>Descrição: {{ hotel.description }}</p>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-form ref="form" @submit.prevent="reserve">
					<v-row>
						<v-col cols="12">
							<v-text-field v-model="name" label="Nome" outlined :rules="[rules.required]"
								required></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-text-field v-model="contact" label="Contato" outlined :rules="[rules.required]"
								required></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-text-field v-model="cardName" label="Nome no Cartão" outlined :rules="[rules.required]"
								required></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-text-field v-model="cardNumber" label="Número do Cartão" outlined
								:rules="[rules.required]" required></v-text-field>
						</v-col>
						<v-col cols="6">
							<v-text-field v-model="expiryDate" label="Validade (MM/AA)" outlined
								:rules="[rules.required]" required></v-text-field>
						</v-col>
						<v-col cols="6">
							<v-text-field v-model="cvv" label="CVV" outlined :rules="[rules.required]"
								required></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-btn type="submit" color="primary">Reservar</v-btn>
						</v-col>
					</v-row>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import type { Hotel } from '@/types'

export default defineComponent({
	name: 'PaymentView',
	data() {
		return {
			name: '',
			contact: '',
			cardName: '',
			cardNumber: '',
			expiryDate: '',
			cvv: '',
			hotel: {} as Hotel,
			rules: {
				required: (value: string) => !!value || 'Campo obrigatório.'
			}
		}
	},
	created() {
		const route = useRoute()
		const hotelParam = route.query.hotel as string
		if (hotelParam) {
			this.hotel = JSON.parse(hotelParam)
		} else {
			console.error('No hotel data found in route parameters.')
		}
	},
	methods: {
		reserve() {
			const form = this.$refs.form as any
			if (form.validate()) {
				console.log('Reserva feita:', {
					name: this.name,
					contact: this.contact,
					cardName: this.cardName,
					cardNumber: this.cardNumber,
					expiryDate: this.expiryDate,
					cvv: this.cvv,
					hotel: this.hotel
				})
			}
		}
	}
})
</script>

<style scoped>
.ORIGIN {}
</style>