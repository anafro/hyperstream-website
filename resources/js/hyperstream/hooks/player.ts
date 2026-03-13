import { defineStore, storeToRefs } from "pinia";
import { useSongExposeStore } from "./song-expose";
import { useRemixExposeStore } from "./remix-expose";
import { ref, watch } from "vue";
import { get, set } from "@vueuse/core";

export const usePlayerStore = defineStore('player', () => {
    const { songUri } = storeToRefs(useSongExposeStore());
    const { remixUri } = storeToRefs(useRemixExposeStore());
    const uri = ref<string | null>(null);

    watch(songUri, (): void => set(uri, get(songUri)));
    watch(remixUri, (): void => set(uri, get(remixUri)));

    return { uri };
});
