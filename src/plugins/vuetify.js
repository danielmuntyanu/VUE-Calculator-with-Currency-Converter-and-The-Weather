import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const lightTheme = {
  dark: false,
  colors: {
    primary: '#6750A4',
    secondary: '#625B71',
    background: '#FFFBFE',
    surface: '#FFFBFE',
    error: '#B3261E',
  }
}

const darkTheme = {
  dark: true,
  colors: {
    primary: '#D0BCFF',
    secondary: '#CCC2DC',
    background: '#1C1B1F',
    surface: '#1C1B1F',
    error: '#F2B8B5',
  }
}

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
      darkTheme,
    }
  }
})