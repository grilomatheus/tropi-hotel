<template>
  <v-container>
    <v-row class="justify-center"><h3>Filtros</h3></v-row>
    <v-row class="mb-4 justify-center">
      <v-col cols="12" md="2">
        <v-select
          v-model="localSortCriteria"
          :items="sortOptions"
          label="Ordenar por"
          variant="outlined"
          density="compact"
          outlined
        />
      </v-col>
      <v-col cols="12" md="2">
        <v-select
          v-model="localSortOrder"
          :items="['asc', 'desc']"
          label="Ordem"
          variant="outlined"
          density="compact"
          outlined
        />
      </v-col>
      <v-col cols="12" md="2">
        <v-menu v-model="menu" :close-on-content-click="false" location="end">
          <template v-slot:activator="{ props }">
            <v-row class="justify-center mt-1">
              <v-btn color="primary" v-bind="props">Comodidades</v-btn>
            </v-row>
          </template>
          <v-card min-width="300">
            <v-list>
              <v-list-item v-for="filter in filterOptions" :key="filter.prop">
                <v-checkbox v-model="localFilters[filter.prop]" :label="filter.label" />
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, watch, toRefs } from 'vue'

type FilterOptions = {
  prop: string
  label: string
}

export default defineComponent({
  name: 'FilterList',
  props: {
    sortCriteria: String,
    sortOrder: String,
    filters: {
      type: Object as () => Record<string, boolean>,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const { sortCriteria, sortOrder, filters } = toRefs(props)
    const localSortCriteria = ref(sortCriteria.value)
    const localSortOrder = ref(sortOrder.value)
    const localFilters = ref(filters.value ?? {})
    const menu = ref(false)

    const sortOptions = ['price', 'rating']
    const filterOptions: FilterOptions[] = [
      { prop: 'wifi', label: 'Wi-Fi' },
      { prop: 'parking', label: 'Estacionamento' },
      { prop: 'breakfast_included', label: 'Café da manhã incluído' },
      { prop: 'pool', label: 'Piscina' },
      { prop: 'gym', label: 'Academia' },
      { prop: 'pets_allowed', label: 'Pets permitidos' },
      { prop: 'family_room', label: 'Quarto Familiar' },
      { prop: 'accessibility', label: 'Acessibilidade' }
    ]

    watch(localSortCriteria, (newValue) => {
      emit('update:sortCriteria', newValue)
    })
    watch(localSortOrder, (newValue) => {
      emit('update:sortOrder', newValue)
    })
    watch(
      localFilters,
      (newValue) => {
        if (newValue !== undefined) {
          emit('update:filters', newValue)
        }
      },
      { deep: true }
    )

    return {
      localSortCriteria,
      localSortOrder,
      localFilters,
      sortOptions,
      filterOptions,
      menu
    }
  }
})
</script>
