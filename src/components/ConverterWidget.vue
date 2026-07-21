<script setup>
import { mdiArrowRight, mdiMenuDown } from '@mdi/js';

import { useConverterStore } from '@/stores/converter-store.js';
import { storeToRefs } from 'pinia';
import { ref, computed, onMounted } from 'vue';
import CalcInputField from './CalcInputField.vue';
import ConvResultField from './ConvResultField.vue';

const isLoading = ref(true)

const convStore = useConverterStore()
const { tickersList, leftTicker, rightTicker } = storeToRefs(convStore)
const { initCurs } = convStore

onMounted(async () => {
    await initCurs()
    isLoading.value = false
})

</script>

<template>
    <section>
       
        <div class="converter_container">
            
            <div class="converters_field">
                <v-progress-circular 
                    v-if="isLoading"
                    indeterminate 
                    :width="7"
                ></v-progress-circular>

                <v-menu v-else open-on-hover>
                    <template v-slot:activator="{ props }">
                        <v-btn
                            color="primary"
                            rounded="xl"
                            elevation="3"
                            v-bind="props"
                            id="leftTicker"
                        >
                            {{leftTicker}}
                            <v-icon :icon="mdiMenuDown" />
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                        v-for="(item, index) in tickersList"
                        :key="index"
                        :value="index"
                        :id="`leftTicker_${item}`"
                        @click="leftTicker = item"
                        >
                        <v-list-item-title>{{ item }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>


                <!-- TITLE -->
                <span class="app_title">
                    ConvCulator+
                </span>


                <v-progress-circular 
                    v-if="isLoading"
                    indeterminate 
                    :width="7"
                ></v-progress-circular>

                <v-menu v-else open-on-hover>
                    <template v-slot:activator="{ props }">
                        <v-btn
                            color="primary"
                            rounded="xl"
                            elevation="3"
                            v-bind="props"
                            id="rightTicker"
                        >
                            {{ rightTicker }}
                            <v-icon :icon="mdiMenuDown" />
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                        v-for="(item, index) in tickersList"
                        :key="index"
                        :value="index"
                        :id="`rightTicker_${item}`"
                        @click="rightTicker = item"
                        >
                        <v-list-item-title>{{ item }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>

            <div class="inputs_field">
                
                <v-sheet
                    border
                    rounded="xl"
                    color="surface"
                    elevation="3"
                    class="inputs_sheet"
                >
                    <CalcInputField 
                        class="inputs_container" 
                        :currency="convStore.curSymbols[leftTicker]"
                    />
                </v-sheet>

                <v-icon :icon="mdiArrowRight" />

                <v-sheet
                    border
                    rounded="xl"
                    color="surface"
                    elevation="3"
                    class="inputs_sheet"
                >
                    <ConvResultField 
                        class="inputs_container" 
                        :currency="convStore.curSymbols[rightTicker]"
                    />
                </v-sheet>

            </div>

        </div>

    </section>
    
  <!-- <v-icon class="myclass" :icon="mdiAccount" /> -->
</template>

<style scoped>
@reference '../assets/main.css';
 
section {
    @apply 
        w-full 
        h-[max(150px,18vh)]
        md:h-[max(250px,20vh)]
    ; 
}

.converter_container {
    @apply 
        w-full h-full
        flex flex-col justify-start items-stretch
    ;
}

.converters_field {
    @apply 
        w-full h-full flex flex-row 
        justify-between items-center
        
    ;
}

.inputs_field {
    @apply 
        w-full h-full 
        flex flex-row justify-between items-center
        gap-2
    ;
}

.app_title {
    @apply 
        text-center text-2xl font-semibold
        text-shadow-sm text-shadow-blue-300
    ;
}

.inputs_sheet {
    @apply 
        w-full max-w-[45%] h-full px-4
    ;
}

.inputs_container {
    @apply 
        h-full py-2
        flex flex-col justify-between items-start
        
    ;
}

</style>
