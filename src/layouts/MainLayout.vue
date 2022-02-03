<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-avatar class="gt-xs">
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
        </q-avatar>

        <!-- <q-toolbar-title>
          OES Giphy
        </q-toolbar-title> -->

        <q-space />

        <q-input
          v-model="searchText"
          type="search"
          class="q-ml-md"
          label="Search"
          maxlength="50"
          dark
          dense
          standout
          style="width: 80%"
        >
          <template v-slot:append>
            <q-icon v-if="searchText === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="searchText = ''" />
          </template>
          <template v-slot:after>
            <q-icon
              v-if="searchText !== ''"
              @click="runSearch"
              class="cursor-pointer"
              name="search"
            />
            <span class="text-caption">
              {{ searchText.length }}/50
            </span>
          </template>
        </q-input>

        <q-space />

        <div>v{{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'OldIndex',
    caption: 'The old index page',
    icon: 'home',
    link: '/OldIndex',
  },
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const $store = useStore();
    const leftDrawerOpen = ref(false);
    const version = process.env.APP_VERSION;
    const searchText = ref('');
    const runSearch = () => {
      // // eslint-disable-next-line no-console
      // console.log('searchText', searchText.value);
      $store.commit('setSearch', searchText);
      // eslint-disable-next-line no-console, @typescript-eslint/no-unsafe-member-access
      console.log('searchText state', $store?.state?.searchString);
    };

    return {
      // searchText: ref(''),
      runSearch,
      searchText,
      essentialLinks: linksList,
      leftDrawerOpen,
      version,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
