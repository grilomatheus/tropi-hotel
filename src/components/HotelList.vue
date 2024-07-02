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
            <h3>Diária: a partir de R${{ hotel.price }}</h3>
          </v-card-subtitle>
          <v-card-subtitle
            >Avaliação: <strong>{{ hotel.rating }}</strong></v-card-subtitle
          >
          <v-card-actions>
            <v-row justify="space-between">
              <v-col cols="auto">
                <v-btn @click.stop="(event: Event) => selectHotel(hotel, event)" variant="outlined">
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

    <v-dialog v-model="showModal" max-width="600px">
      <v-card>
        <v-card-title class="headline">{{ selectedHotel?.name }}</v-card-title>
        <v-card-text>
          <p>
            Preço: <strong>R${{ selectedHotel?.price }}</strong> diária
          </p>
          <p>
            Avaliação: <strong>{{ selectedHotel?.rating }}</strong>
          </p>
          <p>Estado: {{ selectedHotel?.state }}</p>
          <p>Cidade: {{ selectedHotel?.city }}</p>
          <p>Descrição: {{ selectedHotel?.description }}</p>
          <br />
          <h3>Comodidades</h3>
          <p class="d-flex align-center">
            <v-icon class="mr-2">mdi mdi-wifi</v-icon> WiFi:
            {{ selectedHotel?.wifi ? 'Sim' : 'Não' }}
          </p>
          <p class="d-flex align-center">
            <v-icon class="mr-2">mdi mdi-parking</v-icon>Estacionamento:
            {{ selectedHotel?.parking ? 'Sim' : 'Não' }}
          </p>
          <p class="d-flex align-center">
            <v-icon class="mr-2">mdi mdi-pool</v-icon>Piscina:
            {{ selectedHotel?.pool ? 'Sim' : 'Não' }}
          </p>
          <p class="d-flex align-center">
            <v-icon class="mr-2">mdi mdi-silverware-fork-knife</v-icon>Restaurante:
            {{ selectedHotel?.restaurant ? 'Sim' : 'Não' }}
          </p>
          <p class="d-flex align-center">
            <v-icon class="mr-2">mdi mdi-spa</v-icon>Spa:
            {{ selectedHotel?.spa ? 'Sim' : 'Não' }}
          </p>
          <p class="d-flex align-center">
            <v-icon class="mr-2">mdi mdi-dumbbell</v-icon>Academia:
            {{ selectedHotel?.gym ? 'Sim' : 'Não' }}
          </p>
          <p class="d-flex align-center">
            <v-icon class="mr-2">mdi mdi-human-male-male-child</v-icon>Quarto Familiar:
            {{ selectedHotel?.family_room ? 'Sim' : 'Não' }}
          </p>
          <p class="d-flex align-center">
            <v-icon class="mr-2">mdi mdi-hot-tub</v-icon>Banheira de Hidromassagem:
            {{ selectedHotel?.hot_tub ? 'Sim' : 'Não' }}
          </p>
          <p class="d-flex align-center">
            <v-icon class="mr-2">mdi mdi-paw</v-icon>Permite Animais:
            {{ selectedHotel?.pets_allowed ? 'Sim' : 'Não' }}
          </p>
          <p class="d-flex align-center">
            <v-icon class="mr-2">mdi mdi-coffee</v-icon>Café da Manhã:
            {{ selectedHotel?.breakfast_included ? 'Sim' : 'Não' }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showModal = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { PropType } from 'vue'
import type { Hotel } from '@/types'

export default defineComponent({
  name: 'HotelList',
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

    const selectHotel = (hotel: Hotel, event: Event) => {
      event.stopPropagation()
      if (props.selectedHotels.length < 3 || isComparing(hotel)) {
        emit('select-hotel', hotel)
      } else {
        emit('show-snackbar')
      }
    }

    const goToPayment = (hotel: Hotel, event: Event) => {
      event.stopPropagation()
      router.push({
        name: 'Payment',
        query: { hotel: JSON.stringify(hotel) }
      })
    }

    const isComparing = (hotel: Hotel) => {
      return props.selectedHotels.some((selectedHotel) => selectedHotel.id === hotel.id)
    }

    return {
      showModal,
      selectedHotel,
      showHotelDetails,
      selectHotel,
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
