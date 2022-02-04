<template>
  <q-img :src="gifSrc" :ratio="1" class="img-responsive" fit="cover" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import giphyApi from 'giphy-api';

export default defineComponent({
  name: 'GifObject',
  props: {
    gifObject: {
      type: Object as () => giphyApi.GIFObject,
      required: true,
    },
  },
  setup(props) {
    const gifSrc = computed(() => {
      const fixedHeightWidth = parseInt(props.gifObject.images.fixed_height.width, 10);
      if (fixedHeightWidth < 200) {
        return props.gifObject.images.fixed_width.url;
      }
      return props.gifObject.images.fixed_height.url;
    });

    return { gifSrc };
  },
});
</script>
