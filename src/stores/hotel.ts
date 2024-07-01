// src/stores/hotel.ts
import { defineStore } from 'pinia'
import { Hotel } from '../types'

export const useHotelStore = defineStore({
  id: 'hotel',
  state: () => ({
    hotels: [] as Hotel[],
    selectedHotels: [] as Hotel[]
  }),
  actions: {
    setHotels(hotels: Hotel[]) {
      this.hotels = hotels
    },
    selectHotel(hotel: Hotel) {
      if (!this.selectedHotels.find(h => h.id === hotel.id)) {
        this.selectedHotels.push(hotel)
      }
    },
    clearSelection() {
      this.selectedHotels = []
    }
  }
})
