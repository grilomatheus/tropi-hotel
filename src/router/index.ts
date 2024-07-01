// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PaymentView from '@/views/PaymentView.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView
	},
	{
		path: '/payment',
		name: 'Payment',
		component: PaymentView
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
