<template>
  <v-dialog v-model="dialog" max-width="800">
    <v-card>
      <v-card-title> Comparar Hotéis </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col v-for="hotel in selectedHotels" :key="hotel.id" cols="12" md="4">
              <HotelDetailsCard :hotel="hotel" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'
import type { Hotel } from '@/types'
import HotelDetailsCard from '@/components/HotelDetailsCard.vue'

export default defineComponent({
  name: 'CompareHotels',
  components: {
    HotelDetailsCard
  },
  props: {
    selectedHotels: {
      type: Array as PropType<Hotel[]>,
      required: true
    }
  },
  setup() {
    const dialog = ref(true)

    const closeDialog = () => {
      dialog.value = false
    }

    return {
      dialog,
      closeDialog
    }
  }
})
</script>

<style scoped>
.hotel-card {
  margin-bottom: 16px;
}

.v-dialog {
  background: rgba(0, 0, 0, 0.5);
}
</style>
