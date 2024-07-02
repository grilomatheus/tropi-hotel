import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mdi } from 'vuetify/iconsets/mdi'

import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
	components,
	directives,
	icons: {
		defaultSet: 'mdi',
		sets: {
			mdi,
		},
	},
	theme: {
		defaultTheme: 'myCustomTheme',
		themes: {
			myCustomTheme: {
				dark: false,
				colors: {
					primary: '#15870b',
					secondary: '#e1e2d9',
					accent: '#82B1FF',
					error: '#FF5252',
					info: '#2196F3',
					success: '#4CAF50',
					warning: '#FFC107',
				},
			},
		},
	},
})
