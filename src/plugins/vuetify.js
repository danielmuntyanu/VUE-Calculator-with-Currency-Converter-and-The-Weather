import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const lightTheme = {
  dark: false,
  colors: {
    primary: '#31708E',
    secondary: '#687864',
    background: '#F7F9FB',
    surface: '#8FC1E3',
    error: '#B3261E',
  }
}

const darkTheme = {
  dark: true,
  colors: {
    primary: '#31708E',
    secondary: '#687864',
    background: '#222629',
    surface: '#8FC1E3',
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