<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-img src="~assets/icons/favicon-32x32.png" style="height: 32px; width: 32px" />
        <q-toolbar-title shrink style="min-width: 51px">for</q-toolbar-title>
        <q-avatar size="32px">
          <img src="~assets/icons/logo_padding_64x64.png">
        </q-avatar>

        <q-input
          v-model="activeSearch"
          type="search"
          class="q-ml-md"
          label="Search"
          maxlength="50"
          dark
          dense
          standout
          style="width: 80%"
          @focus="(input) =>
            {showHistory = true; try {input.target.select();} catch(err) { console.error(err)} }"
          @keydown.enter="runSearch(activeSearch)"
        >
          <template v-slot:append>
            <q-icon v-if="activeSearch === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="activeSearch = ''" />
          </template>
          <template v-slot:after>
            <q-icon
              v-if="activeSearch !== ''"
              @click="runSearch(activeSearch)"
              class="cursor-pointer"
              name="search"
            />
            <span class="text-caption">
              {{ activeSearch.length }}/50
            </span>
          </template>
        </q-input>

        <q-btn flat @click="showSettings = true">
          <q-icon name="settings" />
        </q-btn>

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
import { QInput } from 'quasar';
import { useSearchStore } from 'src/store/search';
import { useTitleStore } from 'src/store/titlebar';
import { defineComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const version = process.env.APP_VERSION;
    const searchBox = ref(null as unknown as QInput);
    const searchStore = useSearchStore();

    const titleStore = useTitleStore();
    const { activeSearch, showSettings, showHistory } = storeToRefs(titleStore);

    // const searchText = ref(searchStore.activeSearch);
    const runSearch = (text:string, cached = true) => {
      // eslint-disable-next-line no-console
      console.debug('activeSearch', text, cached);
      // Run searchStore action
      searchStore.newSearch(text, cached);
      // Defocus on search box
      if (searchBox.value) searchBox.value.blur();
    };

    return {
      version,
      activeSearch,
      runSearch,
      showSettings,
      showHistory,
    };
  },
});
</script>
