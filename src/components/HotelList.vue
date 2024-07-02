<template>
  <v-container>
    <v-row>
      <v-col v-for="hotel in hotels" :key="hotel.id" cols="12" md="4">
        <v-card @click="() => showHotelDetails(hotel)" class="clickable-card">
          <v-lazy>
            <v-img :src="hotel.thumb" alt="Hotel thumbnail" width="400"></v-img>
          </v-lazy>
          <v-card-title>
            {{ hotel.name }}
          </v-card-title>
          <v-card-subtitle>
            Diária: a partir de<strong> R${{ hotel.price }}</strong>
          </v-card-subtitle>
          <v-card-subtitle
            >Avaliação: <strong>{{ hotel.rating }}</strong></v-card-subtitle
          >
          <v-card-actions>
            <v-row justify="space-between">
              <v-col cols="auto">
                <v-btn
                  @click.stop="(event: Event) => toggleCompareHotel(hotel, event)"
                  variant="outlined"
                  :color="isComparing(hotel) ? 'primary' : ''"
                >
                  Comparar
                  <v-icon v-if="isComparing(hotel)" color="primary">mdi-check-circle</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  color="primary"
                  variant="elevated"
                  @click.stop="(event: Event) => goToPayment(hotel, event)"
                >
                  Reservar
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showModal" max-width="600px" v-if="selectedHotel">
      <HotelDetailsCard :hotel="selectedHotel" />
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { PropType } from 'vue'
import type { Hotel } from '@/types'
import HotelDetailsCard from '@/components/HotelDetailsCard.vue'

export default defineComponent({
  name: 'HotelList',
  components: {
    HotelDetailsCard
  },
  props: {
    hotels: {
      type: Array as PropType<Hotel[]>,
      required: true
    },
    selectedHotels: {
      type: Array as PropType<Hotel[]>,
      required: true
    }
  },
  setup(props, { emit }) {
    const router = useRouter()
    const showModal = ref(false)
    const selectedHotel = ref<Hotel | null>(null)

    const showHotelDetails = (hotel: Hotel) => {
      selectedHotel.value = hotel
      showModal.value = true
    }

    const toggleCompareHotel = (hotel: Hotel, event: Event) => {
      event.stopPropagation()
      if (isComparing(hotel)) {
        emit('deselect-hotel', hotel)
      } else {
        emit('select-hotel', hotel)
      }
    }

    const goToPayment = (hotel: Hotel, event: Event) => {
      event.stopPropagation()

      router.push({
        name: 'Payment',
        query: {
          hotel: JSON.stringify(hotel)
        }
      })
    }

    const isComparing = (hotel: Hotel) => {
      return props.selectedHotels.some((selectedHotel) => selectedHotel.id === hotel.id)
    }

    return {
      showModal,
      selectedHotel,
      showHotelDetails,
      toggleCompareHotel,
      goToPayment,
      isComparing
    }
  }
})
</script>

<style scoped>
.clickable-card {
  cursor: pointer;
}
</style>
