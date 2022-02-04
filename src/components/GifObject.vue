<template>
  <q-img
    :ratio="1"
    :src="gifSrc"
    :class="{ dimmed: dimMyself }"
    class="img-responsive"
    fit="cover"
    @mouseover="dimOthers"
    @mouseleave="undim"
    @click="copy"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useGifStore } from 'src/store/gifobject';
import giphyApi from 'giphy-api';
import { copyToClipboard } from 'quasar';

export default defineComponent({
  name: 'GifObject',
  props: {
    gifObject: {
      type: Object as () => giphyApi.GIFObject,
      required: true,
    },
  },
  setup(props) {
    const gifStore = useGifStore();
    const gifSrc = computed(() => {
      const fixedHeightWidth = parseInt(props.gifObject.images.fixed_height.width, 10);
      if (fixedHeightWidth < 200) {
        return props.gifObject.images.fixed_width.url;
      }
      return props.gifObject.images.fixed_height.url;
    });

    const copy = () => {
      copyToClipboard(props.gifObject.url)
        .then(() => {
          // Toast success!
        })
        .catch(() => {
          // Toast failure :-(
        });
    };

    const dimMyself = computed(() => gifStore.activeIds.length > 0
      && !gifStore.activeIds.includes(props.gifObject.id));

    const dimOthers = () => {
      gifStore.activate(props.gifObject.id);
      // eslint-disable-next-line no-console
      console.debug('Dim others', props.gifObject.id, JSON.stringify(gifStore.activeIds));
    };

    const undim = () => {
      // eslint-disable-next-line no-console
      console.debug('undim', props.gifObject.id);
      gifStore.deactivate(props.gifObject.id);
    };

    return {
      gifSrc, copy, dimMyself, dimOthers, undim,
    };
  },
});
</script>
