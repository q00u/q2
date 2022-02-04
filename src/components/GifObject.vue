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
import { copyToClipboard, useQuasar } from 'quasar';

// TODO Expanded gif actions? View full gif?

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

    const $q = useQuasar();
    const copy = () => {
      copyToClipboard(props.gifObject.url)
        .then(() => {
          // Toast success!
          $q.notify({
            group: false,
            progress: true,
            type: 'positive',
            message: 'Copied!',
            timeout: 1000,
          });
        })
        .catch((reason) => {
          // eslint-disable-next-line no-console
          console.error('Failed to copy to clipboard', reason);
          // Toast failure :-(
          $q.notify({
            group: false,
            progress: true,
            type: 'negative',
            message: 'Something went wrong...',
          });
        });
    };

    const dimMyself = computed(() => gifStore.activeIds.length > 0
      && !gifStore.activeIds.includes(props.gifObject.id));

    const dimOthers = () => {
      gifStore.activate(props.gifObject.id);
    };

    const undim = () => {
      gifStore.deactivate(props.gifObject.id);
    };

    return {
      gifSrc, copy, dimMyself, dimOthers, undim,
    };
  },
});
</script>
