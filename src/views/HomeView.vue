<template>
  <v-container class="container" fluid>
    <v-row class="justify-center">
      <v-col cols="12" md="4">
        <v-img class="banner-home" src="banner.png" :width="300" aspect-ratio="16/9" cover />
      </v-col>
    </v-row>
    <SearchBar @search="handleSearch" />
    <template v-if="hotelsExist">
      <FilterList
        v-model:sortCriteria="sortCriteria"
        v-model:sortOrder="sortOrder"
        v-model:filters="filters"
      />
      <v-row class="justify-center">
        <v-btn
          v-if="hotelsExist"
          :disabled="selectedHotels.length < 2"
          @click="showCompareDialog = true"
          color="primary"
          class="mb-10"
          prepend-icon="mdi mdi-compare-horizontal"
        >
          Comparar Hotéis
        </v-btn>
      </v-row>
    </template>
    <v-container class="no-scroll-container">
      <HotelList
        :hotels="filteredAndSortedHotels"
        :selectedHotels="selectedHotels"
        @select-hotel="handleSelectHotel"
        @deselect-hotel="handleDeselectHotel"
        @show-snackbar="showSnackbarMessage"
      />
    </v-container>
    <v-dialog v-model="showCompareDialog" max-width="800px" @click:outside="closeDialog">
      <CompareHotels :selectedHotels="selectedHotels" @close="closeDialog" />
    </v-dialog>
    <v-snackbar v-model="showSnackbar" :timeout="3000" top right color="error">
      Você pode comparar no máximo 3 hotéis.
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useHotelStore } from '@/stores/hotel'
import SearchBar from '@/components/SearchBar.vue'
import HotelList from '@/components/HotelList.vue'
import FilterList from '@/components/FilterList.vue'
import CompareHotels from '@/components/CompareHotels.vue'
import { fetchHotels } from '@/services/apiService'

export default defineComponent({
  name: 'HomeView',
  components: {
    SearchBar,
    FilterList,
    HotelList,
    CompareHotels
  },
  setup() {
    const hotelStore = useHotelStore()
    const showCompareDialog = ref(false)
    const showSnackbar = ref(false)
    const sortCriteria = ref('price')
    const sortOrder = ref('asc')
    const filters = ref({
      wifi: false,
      parking: false,
      breakfast_included: false,
      pool: false,
      pets_allowed: false,
      gym: false,
      family_room: false,
      accessibility: false
    })

    const hotels = computed(() => hotelStore.hotels)
    const selectedHotels = computed(() => hotelStore.selectedHotels)

    const hotelsExist = computed(() => hotels.value.length > 0)

    const filteredAndSortedHotels = computed(() => {
      return [...hotels.value]
        .filter((hotel) => {
          return (
            (!filters.value.wifi || hotel.wifi) &&
            (!filters.value.parking || hotel.parking) &&
            (!filters.value.breakfast_included || hotel.breakfast_included) &&
            (!filters.value.pool || hotel.pool) &&
            (!filters.value.gym || hotel.gym) &&
            (!filters.value.pets_allowed || hotel.pets_allowed) &&
            (!filters.value.family_room || hotel.family_room) &&
            (!filters.value.accessibility || hotel.accessibility)
          )
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
      if (
        criteria.destination &&
        criteria.checkIn &&
        criteria.checkOut &&
        criteria.rooms &&
        criteria.guests
      ) {
        try {
          const hotels = await fetchHotels()
          const filteredHotels = hotels.filter((hotel: any) => hotel.state === criteria.destination)
          hotelStore.setHotels(filteredHotels)
        } catch (error) {
          console.error('Failed to fetch hotels:', error)
        }
      } else {
        console.warn(
          'Todos os campos devem ser preenchidos corretamente antes de prosseguir com a pesquisa.'
        )
      }
    }

    const handleSelectHotel = (hotel: any) => {
      if (!selectedHotels.value.some((selectedHotel) => selectedHotel.id === hotel.id)) {
        if (selectedHotels.value.length < 3) {
          hotelStore.selectHotel(hotel)
        } else {
          showSnackbar.value = true
        }
      }
    }

    const handleDeselectHotel = (hotel: any) => {
      hotelStore.deselectHotel(hotel)
    }

    const showSnackbarMessage = () => {
      showSnackbar.value = true
    }

    const closeDialog = () => {
      showCompareDialog.value = false
    }

    onMounted(() => {
      hotelStore.setHotels([])
    })

    return {
      hotels,
      hotelsExist,
      filteredAndSortedHotels,
      selectedHotels,
      showCompareDialog,
      showSnackbar,
      sortCriteria,
      sortOrder,
      filters,
      handleSearch,
      handleSelectHotel,
      handleDeselectHotel,
      showSnackbarMessage,
      closeDialog
    }
  }
})
</script>

<style scoped>
.container {
  background-color: #e1e2d9;
}

.no-scroll-container {
  max-height: 600px;
  overflow-y: auto;
}

/* WebKit */
.no-scroll-container::-webkit-scrollbar {
  display: none;
}

/* IE, Edge e Firefox */
.no-scroll-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
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

.banner-home {
  margin: 0 auto;
}
</style>
