<template>
  <div class="row">
    <gif-object
      v-for="gif in data"
      :key="gif.id"
      class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
      :gifObject="gif"
    />
  </div>
</template>

// TODO pagination for more results

<script lang="ts">
import { useSearchStore } from 'src/store/search';
import { computed, defineComponent, onMounted } from 'vue';
import GifObject from 'src/components/GifObject.vue';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    // Create gifSrc array from active search results
    const searchStore = useSearchStore();
    const data = computed(() => searchStore.activeResults?.data);

    onMounted(() => {
      searchStore.newTrending();
    });
    return { data };
  },
  components: { GifObject },
});
</script>
