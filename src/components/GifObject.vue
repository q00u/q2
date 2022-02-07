<template>
  <q-img
    :ratio="1"
    :src="gifSrc"
    :class="{ dimmed: dimMyself }"
    class="img-responsive"
    fit="cover"
    @mouseover="dimOthers"
    @mouseleave="undim"
  >
    <div v-if="activeGif" class="absolute-bottom-left" @click="copy">
      <q-icon
        class="cursor-pointer"
        name="content_copy"
        size="lg"
      >
        <q-tooltip>{{ $t('copy') }}</q-tooltip>
      </q-icon>
    </div>
    <div v-if="activeGif" class="absolute-bottom-right" @click="showGif">
      <q-icon
        class="cursor-pointer"
        name="open_in_full"
        size="lg"
      >
        <q-tooltip>{{ $t('expand') }}</q-tooltip>
      </q-icon>
    </div>
  </q-img>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useGifStore } from 'src/store/gifobject';
import giphyApi from 'giphy-api';
import { copyToClipboard, useQuasar } from 'quasar';

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
    // const gifSrcFull = computed(() => props.gifObject.images.original.url);

    // For full gif dialog
    const showGif = () => {
      gifStore.gifSrcFull = props.gifObject.images.original.url;
      gifStore.showGif = true;
      // eslint-disable-next-line no-console
      console.debug('Showing full size original gif', gifStore.showGif, gifStore.gifSrcFull);
    };

    const $q = useQuasar();
    const copy = () => {
      copyToClipboard(props.gifObject.url)
        .then(() => {
          // Toast success!
          $q.notify({
            group: false,
            progress: true,
            type: 'positive',
            message: 'Copied!', // TODO: Figure out why $t is not accessible inside defineComponent
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

    const activeGif = computed(() => gifStore.activeIds.length > 0
      && gifStore.activeIds.includes(props.gifObject.id));

    const dimMyself = computed(() => gifStore.activeIds.length > 0
      && !gifStore.activeIds.includes(props.gifObject.id));

    const dimOthers = () => {
      gifStore.activate(props.gifObject.id);
    };

    const undim = () => {
      gifStore.deactivate(props.gifObject.id);
    };

    return {
      gifSrc, showGif, copy, activeGif, dimMyself, dimOthers, undim,
    };
  },
});
</script>
