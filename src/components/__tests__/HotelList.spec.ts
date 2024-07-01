import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HotelList from '../HotelList.vue'
import { nextTick } from 'vue'

const hotels = [
	{
		id: 1,
		name: 'Hotel DIGIFAD',
		price: 306.11,
		rating: 4.5,
		state: 'California',
		city: 'San Francisco',
		wifi: true,
		parking: true,
		pool: false,
		restaurant: true,
		spa: false,
		gym: true,
		family_room: false,
		accessibility: true,
		hot_tub: false,
		pets_allowed: false,
		breakfast_included: true,
		description: "Located in the heart of San Francisco with stunning views of the city.",
		thumb: 'path/to/image.jpg'
	},
	{
		id: 2,
		name: 'Hotel NETILITY',
		price: 212.45,
		rating: 3.9,
		state: 'New York',
		city: 'New York City',
		wifi: true,
		parking: false,
		pool: true,
		restaurant: false,
		spa: true,
		gym: false,
		family_room: true,
		accessibility: false,
		hot_tub: true,
		pets_allowed: true,
		breakfast_included: false,
		description: "Luxury accommodation in NYC with top-notch amenities.",
		thumb: 'path/to/another-image.jpg'
	}
];

describe('HotelList', () => {
	it('renders a list of hotels correctly', async () => {
		const wrapper = mount(HotelList, {
			props: {
				hotels,
				selectedHotels: []
			},
			global: {
				stubs: ['router-link', 'router-view']
			}
		});

		expect(wrapper.findAll('.clickable-card').length).toBe(hotels.length);
		expect(wrapper.text()).toContain('Hotel DIGIFAD');
		expect(wrapper.text()).toContain('Hotel NETILITY');

		await wrapper.findAll('.clickable-card')[0].trigger('click');

		await nextTick();

		expect(wrapper.vm.showModal).toBe(true);
	});
});
