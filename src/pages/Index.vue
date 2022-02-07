<template>
  <div class="row" @mouseleave="undim">
    <gif-object
      v-for="gif in data"
      :key="gif.id"
      :gifObject="gif"
      class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
    />
  </div>

  <q-dialog v-model="showGif" no-shake>
    <q-img :src="gifSrcFull" />
  </q-dialog>

  <q-dialog v-model="showSettings" no-shake>
    <q-card style="min-width:50%">
      <q-card-section class="row items-center no-wrap">
        <div class="text-h5">{{ $t('settings') }}</div>
        <q-space />
        <q-btn v-close-popup icon="close" flat round />
      </q-card-section>
      <q-separator />
      <q-card-section class="scroll" style="max-height: 50vh">
        <div class="text-subtitle1">{{ $t('rating') }}</div>
        <q-radio
          v-model="searchRating"
          v-for="(rating, index) in ratings"
          :key="index"
          :label="rating.toUpperCase()"
          :val="rating"
        />
        <div class="text-subtitle1">{{ $t('language') }}</div>
        <q-radio
          v-model="locale"
          v-for="(language, index) in languages"
          :key="index"
          :label="language.autoglottonym"
          :val="language.name"
        />
        <!-- <q-list dense>
          <q-item
            v-for="(option, index) in options"
            :key="index"
            :label="option.label"
            :value="option.value"
            @click="option.action"
          />
        </q-list> -->
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showHistory" no-focus no-refocus no-shake seamless>
    <q-card style="min-width: 50%">
      <q-card-section class="row items-center no-wrap">
        <div class="text-h5">{{ $t('searchHistory') }}</div>
        <q-space />
        <q-btn v-close-popup icon="close" flat round />
      </q-card-section>
      <q-separator />
      <q-card-section class="scroll" style="max-height: 50vh">
        <div class="column">
          <div
            v-for="(item, index) in historyList"
            :key="index"
            class="col"
          >
            <div class="row items-center no-wrap justify-between">
              <div class="col-1" style="min-width: 42px">
                <q-btn @click="search(item, false)" icon="autorenew" flat round />
              </div>
              <div class="col">
                <q-btn @click="search(item)" flat no-caps>{{ item }}</q-btn>
              </div>
              <div class="col-1" style="min-width: 42px">
                <q-btn @click="remove(item)" icon="backspace" flat round />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

// TODO pagination for more results

<script lang="ts">
import { useSearchStore } from 'src/store/search';
import { useGifStore } from 'src/store/gifobject';
import { useTitleStore } from 'src/store/titlebar';
import {
  computed, defineComponent, onMounted, watch,
} from 'vue';
import GifObject from 'src/components/GifObject.vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    // Create gifSrc array from active search results
    const searchStore = useSearchStore();
    const data = computed(() => searchStore.activeResults?.data);
    // Possible filter ratings
    const ratings = ['g', 'pg', 'pg-13', 'r'];
    // Possible languages
    const languages = [
      { name: 'en', autoglottonym: 'English' },
      { name: 'es', autoglottonym: 'español' },
      { name: 'ja', autoglottonym: '日本語' },
      { name: 'fr', autoglottonym: 'français' },
      { name: 'de', autoglottonym: 'Deutsch' },
    ];
    const { searchRating, searchLang } = storeToRefs(searchStore);
    const { locale } = useI18n({ useScope: 'global' });
    watch(locale, (currentValue) => {
      searchLang.value = currentValue;
    });
    // Create historyList array from searchHistory
    const historyList = computed(() => Object.keys(searchStore.searchHistory));

    // Get gif store for full-gif dialog
    const gifStore = useGifStore();
    const { showGif, gifSrcFull } = storeToRefs(gifStore);

    // Get title store for dialog state toggles
    const titleStore = useTitleStore();
    const { showSettings, showHistory } = storeToRefs(titleStore);

    // Wrappers for search actions
    const search = (searchString: string, cached = true) => {
      searchStore.newSearch(searchString, cached);
    };
    const remove = (searchString: string) => {
      searchStore.removeSearch(searchString);
    };

    // Undim all when mouse leaves screen (failsafe)
    const undim = () => {
      gifStore.clear();
    };

    onMounted(() => {
      searchStore.newTrending();
    });
    return {
      data,
      ratings,
      searchRating,
      languages,
      locale,
      searchLang,
      showGif,
      gifSrcFull,
      showSettings,
      showHistory,
      historyList,
      search,
      remove,
      undim,
    };
  },
  components: { GifObject },
});
</script>
