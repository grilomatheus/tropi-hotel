<template>
  <v-container>
    <v-row>
      <v-col>
        <v-img
          class="banner-checkout"
          src="banner.png"
          :width="300"
          aspect-ratio="16/9"
          @click="goHome"
          cover
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" v-if="!formSubmitted">
        <HotelDetailsCard :hotel="hotel">
          <v-divider class="my-4" />
          <p>Check-in: {{ formattedCheckIn }}</p>
          <p>Check-out: {{ formattedCheckOut }}</p>
          <p>Total de dias: {{ totalDays }}</p>
          <p>
            Valor total da(s) diária(s):
            <span class="total-price">{{ formattedTotalPrice }}</span>
          </p>
        </HotelDetailsCard>
      </v-col>
      <v-col cols="12" md="6" v-if="!formSubmitted">
        <v-form ref="form" @submit.prevent="reserve">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="name"
                label="Nome"
                variant="outlined"
                density="compact"
                maxlength="100"
                outlined
                :rules="[rules.required]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="contact"
                label="Contato"
                variant="outlined"
                density="compact"
                maxlength="11"
                outlined
                :rules="[rules.required]"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="cardName"
                label="Nome no Cartão"
                variant="outlined"
                density="compact"
                maxlength="40"
                outlined
                :rules="[rules.required]"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="cardNumber"
                label="Número do Cartão"
                variant="outlined"
                density="compact"
                maxlength="16"
                outlined
                :rules="[rules.required]"
                required
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="expiryDate"
                label="Validade (MM/AA)"
                variant="outlined"
                density="compact"
                maxlength="5"
                outlined
                :rules="[rules.required]"
                required
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="cvv"
                label="CVV"
                variant="outlined"
                density="compact"
                maxlength="3"
                outlined
                :rules="[rules.required]"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-btn type="submit" color="primary">Reservar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-row v-if="formSubmitted" class="justify-center align-center" style="min-height: 50vh">
        <v-col cols="12" class="text-center booking">
          <v-tipografy variant="h2" class="font-weight-bold text-primary" style="font-size: 24px">
            Reserva Confirmada
          </v-tipografy>
          <br />
          <img src="../assets/checkout.png" alt="Reserva Completa" class="banner" />
          <v-col cols="12" class="text-center">
            <v-btn color="primary" @click="goHome">Voltar para a Home</v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Hotel } from '@/types'
import HotelDetailsCard from '@/components/HotelDetailsCard.vue'

export default defineComponent({
  name: 'PaymentView',
  components: {
    HotelDetailsCard
  },
  data() {
    return {
      name: '',
      contact: '',
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      hotel: {} as Hotel,
      checkIn: '',
      checkOut: '',
      allFieldsFilled: false,
      formSubmitted: false,
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

    this.checkIn = localStorage.getItem('checkIn') || ''
    this.checkOut = localStorage.getItem('checkOut') || ''
  },
  computed: {
    totalDays(): number {
      const checkInDate = new Date(this.checkIn)
      const checkOutDate = new Date(this.checkOut)
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime()
      const dayDiff = timeDiff / (1000 * 3600 * 24)
      return Math.max(dayDiff, 0) // Ensure it does not go negative
    },
    totalPrice(): number {
      return this.totalDays * this.hotel.price
    },
    formattedTotalPrice(): string {
      return this.totalPrice.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    },
    formattedCheckIn(): string {
      return this.formatDate(this.checkIn)
    },
    formattedCheckOut(): string {
      return this.formatDate(this.checkOut)
    }
  },
  methods: {
    formatDate(dateStr: string): string {
      const date = new Date(dateStr)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    },
    checkFields() {
      this.allFieldsFilled =
        !!this.name &&
        !!this.contact &&
        !!this.cardName &&
        !!this.cardNumber &&
        !!this.expiryDate &&
        !!this.cvv
    },
    reserve() {
      const form = this.$refs.form as any
      this.checkFields()
      if (form.validate() && this.allFieldsFilled) {
        console.log('Reserva feita:', {
          name: this.name,
          contact: this.contact,
          cardName: this.cardName,
          cardNumber: this.cardNumber,
          expiryDate: this.expiryDate,
          cvv: this.cvv,
          hotel: this.hotel,
          checkIn: this.checkIn,
          checkOut: this.checkOut
        })
        this.formSubmitted = true
      } else {
        this.allFieldsFilled = false
      }
    },
    goHome() {
      this.$router.push('/')
    }
  }
})
</script>

<style lang="scss" scoped>
.total-price {
  font-weight: bold;
  font-size: 16px;
  color: #15870b;
}
.banner {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}
.banner-checkout {
  margin: 0 auto;
  cursor: pointer;
}
.booking {
  img {
    max-width: 200px;
  }
}
.v-btn {
  margin-top: 20px;
}
</style>
