import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HotelDetailsCard from '../HotelDetailsCard.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

const vuetify = createVuetify()

describe('HotelDetailsCard', () => {
	it('renders properly with given props', () => {
		const hotel = {
			id: 1,
			name: 'Hotel DIGIFAD',
			price: 306.11,
			rating: 3.1,
			state: 'Bahia',
			city: 'Feira de Santana',
			wifi: false,
			parking: true,
			pool: true,
			restaurant: false,
			spa: false,
			gym: true,
			family_room: true,
			accessibility: true,
			hot_tub: true,
			pets_allowed: true,
			breakfast_included: false,
			description: 'Tempor ea consequat et magna aliquip aute.',
			thumb: 'path/to/thumbnail.jpg'
		}

		const wrapper = mount(HotelDetailsCard, {
			props: { hotel },
			global: {
				plugins: [vuetify]
			}
		})

		expect(wrapper.text()).toContain(hotel.name)
		expect(wrapper.text()).toContain(`Diárias a partir de R$${hotel.price}`)
		expect(wrapper.text()).toContain(`Avaliação: ${hotel.rating}`)
		expect(wrapper.text()).toContain(`Estado: ${hotel.state}`)
		expect(wrapper.text()).toContain(`Cidade: ${hotel.city}`)
		expect(wrapper.text()).toContain(`Descrição: ${hotel.description}`)
	})
})
