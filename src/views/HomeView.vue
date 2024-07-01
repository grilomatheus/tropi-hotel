<template>
	<v-container class="container">
		<div class="banner-container">
			<img src="../assets/banner.png" alt="Banner" class="banner" />
		</div>
		<SearchComponent @search="handleSearch" />
		<template v-if="hotelsExist">
			<v-row class="mb-4">
				<v-col cols="12" md="4">
					<v-select v-model="sortCriteria" :items="sortOptions" label="Ordenar por" outlined></v-select>
				</v-col>
				<v-col cols="12" md="4">
					<v-select v-model="sortOrder" :items="sortOrderOptions" label="Ordem" outlined></v-select>
				</v-col>
			</v-row>
			<v-row class="mb-0">
				<h3>Comodidades:</h3>
			</v-row>
			<v-row class="mb-0">
				<v-checkbox v-model="filters.wifi" label="Wi-Fi" />
				<v-checkbox v-model="filters.parking" label="Estacionamento" />
				<v-checkbox v-model="filters.breakfast_included" label="Café da manhã incluído" />
				<v-checkbox v-model="filters.pool" label="Piscina" />
				<v-checkbox v-model="filters.gym" label="Academia" />
				<v-checkbox v-model="filters.pets_allowed" label="Pets permitidos" />
				<v-checkbox v-model="filters.family_room" label="Quarto Familiar" />
				<v-checkbox v-model="filters.accessibility" label="Acessibilidade" />
			</v-row>

			<v-row>
				<v-col>
					<v-btn v-if="hotelsExist" @click="showCompareDialog = true" color="primary" class="mb-10">
						Comparar Hotéis
					</v-btn>
				</v-col>
			</v-row>
		</template>
		<v-container style="max-height: 600px; overflow-y: auto;">
			<HotelList :hotels="filteredAndSortedHotels" :selectedHotels="selectedHotels"
				@select-hotel="handleSelectHotel"
				@show-snackbar="showSnackbarMessage" />
		</v-container>
		<v-dialog v-model="showCompareDialog" max-width="800px">
			<CompareHotels :selectedHotels="selectedHotels" />
		</v-dialog>
		<v-snackbar v-model="showSnackbar" :timeout="3000" top right color="error">
			Você pode comparar no máximo 3 hotéis.
		</v-snackbar>
	</v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useHotelStore } from '@/stores/hotel'
import SearchComponent from '@/components/SearchComponent.vue'
import HotelList from '@/components/HotelList.vue'
import CompareHotels from '@/components/CompareHotels.vue'
import { fetchHotels } from '@/services/apiService'

export default defineComponent({
	name: 'HomeView',
	components: {
		SearchComponent,
		HotelList,
		CompareHotels
	},
	setup() {
		const hotelStore = useHotelStore()
		const showCompareDialog = ref(false)
		const showSnackbar = ref(false)
		const sortCriteria = ref('price')
		const sortOrder = ref('asc')
		const sortOptions = ['price', 'rating']
		const sortOrderOptions = ['asc', 'desc']
		const filters = ref({
			wifi: false,
			parking: false,
			breakfast_included: false,
			pool: false,
			pets_allowed: false,
			gym: false,
			family_room: false,
			accessibility: false,
		})

		const hotels = computed(() => hotelStore.hotels)
		const selectedHotels = ref(hotelStore.selectedHotels)

		const hotelsExist = computed(() => hotels.value.length > 0)

		const filteredAndSortedHotels = computed(() => {
			return [...hotels.value]
				.filter(hotel => {
					return (!filters.value.wifi || hotel.wifi) &&
						(!filters.value.parking || hotel.parking) &&
						(!filters.value.breakfast_included || hotel.breakfast_included) &&
						(!filters.value.pool || hotel.pool) &&
						(!filters.value.gym || hotel.gym) &&
						(!filters.value.pets_allowed || hotel.pets_allowed) &&
						(!filters.value.family_room || hotel.family_room) &&
						(!filters.value.accessibility || hotel.accessibility)
				})
				.sort((a, b) => {
					let comparison = 0
					if (sortCriteria.value === 'price') {
						comparison = a.price - b.price
					} else if (sortCriteria.value === 'rating') {
						comparison = b.rating - a.rating
					}
					return sortOrder.value === 'asc' ? comparison : -comparison
				})
		})

		const handleSearch = async (criteria: any) => {
			if (criteria.destination && criteria.checkIn && criteria.checkOut && criteria.rooms && criteria.guests) {
				try {
					const hotels = await fetchHotels()
					const filteredHotels = hotels.filter((hotel: any) => hotel.state === criteria.destination)
					hotelStore.setHotels(filteredHotels)
				} catch (error) {
					console.error("Failed to fetch hotels:", error)
				}
			} else {
				console.warn("Todos os campos devem ser preenchidos corretamente antes de prosseguir com a pesquisa.")
			}
		}

		const handleSelectHotel = (hotel: any) => {
			if (selectedHotels.value.length < 3 || selectedHotels.value.some(selectedHotel => selectedHotel.id === hotel.id)) {
				hotelStore.selectHotel(hotel)
			} else {
				showSnackbar.value = true
			}
		}

		const showSnackbarMessage = () => {
			showSnackbar.value = true
		}

		return {
			hotels,
			hotelsExist,
			filteredAndSortedHotels,
			selectedHotels,
			showCompareDialog,
			showSnackbar,
			sortCriteria,
			sortOrder,
			sortOptions,
			sortOrderOptions,
			filters,
			handleSearch,
			handleSelectHotel,
			showSnackbarMessage
		}
	}
})
</script>


<style scoped>
.container {
	background-color: #e1e2d9;
}

.banner-container {
	text-align: center;
	margin-bottom: 16px;
}

.banner {
	width: 300px;
}

.mb-10 {
	margin-bottom: 10px;
}
</style>