<template>
  <div class="row">
    <gif-object
      v-for="gif in data"
      :key="gif.id"
      class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
      :gifObject="gif"
    />
  </div>

  <q-dialog v-model="showGif" no-shake>
    <q-img :src="gifSrcFull" />
  </q-dialog>

  <q-dialog v-model="showSettings" no-shake>
    <q-card style="min-width:50%">
      <q-card-section class="row items-center no-wrap">
        <div class="text-h5">Settings</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </q-card-section>
      <q-separator />
      <q-card-section style="max-height: 50vh" class="scroll">
        <!-- <q-list dense>
          <q-item
            v-for="(option, index) in options"
            :key="index"
            :label="option.label"
            :value="option.value"
            @click="option.action"
          />
        </q-list> -->
        <div> TODO </div>
      </q-card-section>
    </q-card>
  </q-dialog>

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
              <div class="col-1">
                <q-btn flat round icon="autorenew" @click="search(item, false)" />
              </div>
              <div class="col">
                <q-btn flat @click="search(item)">{{ item }}</q-btn>
              </div>
              <div class="col-1">
                <q-btn flat round icon="clear" @click="remove(item)" />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

// TODO pagination for more results
// TODO settings dialog options

<script lang="ts">
import { useSearchStore } from 'src/store/search';
import { useGifStore } from 'src/store/gifobject';
import { useTitleStore } from 'src/store/titlebar';
import { computed, defineComponent, onMounted } from 'vue';
import GifObject from 'src/components/GifObject.vue';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    // Create gifSrc array from active search results
    const searchStore = useSearchStore();
    const data = computed(() => searchStore.activeResults?.data);
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

    onMounted(() => {
      searchStore.newTrending();
    });
    return {
      data,
      showGif,
      gifSrcFull,
      showSettings,
      showHistory,
      historyList,
      search,
      remove,
    };
  },
  components: { GifObject },
});
</script>
