<template>
	<v-container>
		<v-form ref="form" @submit.prevent="validateForm">
			<v-row>
				<v-col cols="12" md="4">
					<v-autocomplete v-model="destination" :items="stateNames" label="Destino" outlined
						:rules="[rules.required]"></v-autocomplete>
				</v-col>
				<v-col cols="12" md="3">
					<v-text-field v-model="checkIn" label="Check-in" type="date" outlined
						:rules="[rules.required]"></v-text-field>
				</v-col>
				<v-col cols="12" md="3">
					<v-text-field v-model="checkOut" label="Check-out" type="date" outlined
						:rules="[rules.required]"></v-text-field>
				</v-col>
				<v-col cols="12" md="1">
					<v-text-field v-model="rooms" label="Quartos" type="number" min="1" outlined
						:rules="[rules.required, rules.min1]"></v-text-field>
				</v-col>
				<v-col cols="12" md="1">
					<v-text-field v-model="guests" label="Hóspedes" type="number" min="1" outlined
						:rules="[rules.required, rules.min1]"></v-text-field>
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
			states: [] as { id: number, name: string, abbreviation: string }[],
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


<style scoped>
.v-form {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 16px;
}
</style>