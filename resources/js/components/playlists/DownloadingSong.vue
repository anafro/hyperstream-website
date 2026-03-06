<script setup lang="ts">
import { useSongDownloaderStore } from '@/hyperstream/hooks/song-downloader';
import Song from '@/components/playlists/Song.vue';
import { storeToRefs } from 'pinia';


const { downloadingStatus } = storeToRefs(useSongDownloaderStore());
</script>

<template>
    <Song v-if="downloadingStatus === 'requested'" skeleton></Song>
</template>
