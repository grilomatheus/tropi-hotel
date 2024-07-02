<template>
  <v-container>
    <v-row>
      <v-col>
        <v-img class="banner-checkout" src="banner.png" :width="300" aspect-ratio="16/9" cover />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" v-if="!formSubmitted">
        <HotelDetailsCard :hotel="hotel" />
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
              ></v-text-field>
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
              ></v-text-field>
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
              ></v-text-field>
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
              ></v-text-field>
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
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn type="submit" color="primary">Reservar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-row v-if="formSubmitted" class="justify-center align-center" style="min-height: 50vh">
        <v-col cols="12" class="text-center booking">
          <h2>Reserva Confirmada</h2>
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
import { defineComponent } from 'vue'
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
  },
  methods: {
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
          hotel: this.hotel
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
.banner {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}
.banner-checkout {
  margin: 0 auto;
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
