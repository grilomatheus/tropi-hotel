// src/components/__tests__/CompareHotels.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CompareHotels from '../CompareHotels.vue'

describe('CompareHotels', () => {
	it('renders properly with given props', () => {
		const selectedHotels = [
			{
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
				thumb: 'src/assets/hotels-thumb/hotel_10.webp'
			},
			{
				id: 2,
				name: 'Hotel NETILITY',
				price: 235.98,
				rating: 3.6,
				state: 'Ceará',
				city: 'Fortaleza',
				wifi: false,
				parking: false,
				pool: true,
				restaurant: false,
				spa: false,
				gym: false,
				family_room: true,
				accessibility: false,
				hot_tub: false,
				pets_allowed: true,
				breakfast_included: true,
				description: 'Dolore veniam consectetur dolore deserunt veniam elit non exercitation ex.',
				thumb: 'src/assets/hotels-thumb/hotel_39.webp'
			}
		]

		const wrapper = mount(CompareHotels, {
			props: { selectedHotels }
		})

		expect(wrapper.text()).toContain('Hotel DIGIFAD')
		expect(wrapper.text()).toContain('Hotel NETILITY')
		expect(wrapper.text()).toContain('Diárias a partir de R$306.11')
		expect(wrapper.text()).toContain('Diárias a partir de R$235.98')
		expect(wrapper.text()).toContain('Avaliação: 3.1')
		expect(wrapper.text()).toContain('Avaliação: 3.6')
	})
})
