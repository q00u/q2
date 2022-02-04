<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <img src="/icons/tile-38x38.png">

        <q-space />

        <q-input
          v-model="searchText"
          type="search"
          class="q-ml-md"
          label="Search"
          maxlength="50"
          dark
          dense
          standout
          style="width: 80%"
          @keydown.enter="runSearch"
        >
          <template v-slot:append>
            <q-icon v-if="searchText === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="searchText = ''" />
          </template>
          <template v-slot:after>
            <q-icon
              v-if="searchText !== ''"
              @click="runSearch"
              class="cursor-pointer"
              name="search"
            />
            <span class="text-caption">
              {{ searchText.length }}/50
            </span>
          </template>
        </q-input>

        <q-space />

        <div>v{{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useSearchStore } from 'src/store/search';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const version = process.env.APP_VERSION;
    const searchStore = useSearchStore();
    const searchText = ref(searchStore.activeSearch);
    const runSearch = () => {
      // eslint-disable-next-line no-console
      console.debug('searchText', searchText.value);
      searchStore.newSearch(searchText.value);
      // eslint-disable-next-line no-console
      console.debug('active search:', searchStore.activeSearch);
      // eslint-disable-next-line no-console
      console.debug('active results:', searchStore.activeResults);
    };

    return {
      runSearch,
      searchText,
      version,
    };
  },
});
</script>
