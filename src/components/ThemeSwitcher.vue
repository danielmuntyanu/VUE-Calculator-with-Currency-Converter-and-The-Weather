<script setup>
import { computed, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import { mdiWeatherSunny } from '@mdi/js'
import { mdiWeatherNight } from '@mdi/js'

const theme = useTheme()

const isDark = computed(() => theme.global.current.value.dark)

const themeIcon = computed(() =>
  isDark.value ? mdiWeatherSunny : mdiWeatherNight
)

function toggleTheme() {
  const newTheme = isDark.value ? 'lightTheme' : 'darkTheme'
  theme.change(newTheme)
  localStorage.setItem('theme', newTheme)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    theme.change(savedTheme)
  }
})
</script>

<template>
    <v-btn icon variant="text" @click="toggleTheme">
        <v-scale-transition leave-absolute>
            <v-icon :key="themeIcon">
                {{ themeIcon }}
            </v-icon>
        </v-scale-transition>
    </v-btn>
</template>