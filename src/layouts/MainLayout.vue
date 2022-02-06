<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-img src="/icons/favicon-32x32.png" style="height: 32px; width: 32px" />
        <q-toolbar-title shrink style="min-width: 51px">for</q-toolbar-title>
        <q-avatar size="32px">
          <img src="/icons/logo_padding_64x64.png">
        </q-avatar>

        <!-- <q-space /> -->

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

        <q-btn flat @click="settings">
          <q-icon name="settings" />
        </q-btn>

        <q-space />

        <div>v{{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-dialog v-model="showHistory" no-focus no-refocus no-shake seamless>
      <q-card style="min-width: 50%">
        <q-card-section class="row items-center no-wrap">
          <div class="text-h5">Search History</div>
          <q-space />
          <q-btn flat round icon="close" v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="column">
            <div
              v-for="(item, index) in historyList"
              :key="index"
              class="col"
            >
              <div class="row justify-between">
                <div class="col">
                  <q-btn flat @click="runSearch(item)">{{ item }}</q-btn>
                </div>
                <div class="col-1">
                  <q-btn flat round icon="autorenew" @click="runSearch(item, false)" />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { QInput } from 'quasar';
import { useSearchStore } from 'src/store/search';
import { useTitleStore } from 'src/store/titlebar';
import { computed, defineComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const version = process.env.APP_VERSION;
    const searchBox = ref(null as unknown as QInput);
    const searchStore = useSearchStore();

    const titleStore = useTitleStore();
    const { activeSearch } = storeToRefs(titleStore);

    // search history view
    const showHistory = ref(false);
    const historyList = computed(() => Object.keys(searchStore.searchHistory));

    // const searchText = ref(searchStore.activeSearch);
    const runSearch = (text:string, cached = true) => {
      // eslint-disable-next-line no-console
      console.debug('activeSearch', text, cached);
      // Hide history box on search
      showHistory.value = false;
      // Run searchStore action
      searchStore.newSearch(text, cached);
      // // Update search box
      // searchText.value = searchStore.activeSearch;
      // eslint-disable-next-line no-console
      console.debug('active search:', activeSearch.value);
      // eslint-disable-next-line no-console
      console.debug('active results:', searchStore.activeResults);
      // Defocus on search box
      if (searchBox.value) searchBox.value.blur();
    };

    // TODO Add settings modal
    const showSettings = ref(false);
    const settings = () => {
      // TODO Settings modal here
      showSettings.value = !showSettings.value;
    };

    return {
      version,
      activeSearch,
      // searchText,
      runSearch,
      showHistory,
      historyList,
      showSettings,
      settings,
    };
  },
});
</script>
