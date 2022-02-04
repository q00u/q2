<template>
  <div class="row">
    <div
      v-for="(result, index) in gifSrc"
      :key="index"
      class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
      <q-img :src="result" :ratio="1" class="img-responsive" fit="cover" />
    </div>
  </div>
</template>

<script lang="ts">
import { useSearchStore } from 'src/store/search';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    // Create gifSrc array from active search results
    const searchStore = useSearchStore();
    const gifSrc = computed(() => searchStore.activeResults?.data.map((gif) => {
      const fixedHeightWidth = parseInt(gif.images.fixed_height.width, 10);
      if (fixedHeightWidth < 200) {
        return gif.images.fixed_width.url;
      }
      return gif.images.fixed_height.url;
    }));

    return { gifSrc };
  },
});
</script>
