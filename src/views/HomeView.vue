<template>
	<v-container class="container">
	  <img src="../assets/banner.png" alt="Banner" class="banner" />
	  <SearchComponent @search="handleSearch" />
	  <HotelList :hotels="hotels" @select-hotel="handleSelectHotel" @reserve-hotel="handleReserveHotel" />
	  <CompareHotels :selectedHotels="selectedHotels" />
	  <ReserveHotel v-if="selectedHotel" @reserve="handleReserve" />
	</v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useHotelStore } from '../stores/hotel'
  import SearchComponent from '../components/SearchComponent.vue'
  import HotelList from '../components/HotelList.vue'
  import CompareHotels from '../components/CompareHotels.vue'
  import ReserveHotel from '../components/ReserveHotel.vue'
  import { fetchHotels } from '../services/apiService'
  
  export default defineComponent({
	name: 'HomeView',
	components: {
	  SearchComponent,
	  HotelList,
	  CompareHotels,
	  ReserveHotel
	},
	setup() {
	  const hotelStore = useHotelStore()
	  const selectedHotel = ref(null)
	  const hotels = computed(() => hotelStore.hotels)
	  const selectedHotels = computed(() => hotelStore.selectedHotels)
  
	  const handleSearch = async (criteria: any) => {
		console.log('Search criteria:', criteria)
		const hotels = await fetchHotels()
		hotelStore.setHotels(hotels)
		console.log('Hotels set:', hotelStore.hotels)
	  }
  
	  const handleSelectHotel = (hotel: any) => {
		hotelStore.selectHotel(hotel)
	  }
  
	  const handleReserveHotel = (hotel: any) => {
		selectedHotel.value = hotel
	  }
  
	  const handleReserve = (details: any) => {
		console.log('Reservando hotel:', selectedHotel.value, 'com detalhes:', details)
		selectedHotel.value = null
	  }
  
	  return {
		hotels,
		selectedHotels,
		selectedHotel,
		handleSearch,
		handleSelectHotel,
		handleReserveHotel,
		handleReserve
	  }
	}
  })
  </script>
  
  <style scoped>
  .container {
	background-color: #e1e2d9;
  }
  .banner {
	width: 300px;
	margin-bottom: 16px;
	margin: 0 auto;
  }
  </style>
  