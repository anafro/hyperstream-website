import { defineStore } from "pinia";
import { useEventBusStore } from "../events/event-bus";
import { ref } from "vue";
import { get, set } from "@vueuse/core";
import { SongExposed } from "../events/events";


export type SongExposeStatus = 'idle' | 'requested' | 'exposed' | 'fail';


export const useSongExposeStore = defineStore('song-expose', () => {
    const { dispatch, listen } = useEventBusStore();
    const songUri = ref<string | null>(null);
    const requestedId = ref<number | null>(null);
    const status = ref<SongExposeStatus>('idle');

    function requestSongExpose(id: number): void {
        dispatch('song.expose', { id: id });
        set(requestedId, id);
        set(status, 'requested');
    }

    listen('song.exposed', (event: SongExposed): void => {
        if ([null, event.content.id].includes(get(requestedId))) {
            set(songUri, event.content.uri);
            set(status, 'exposed');
        }
    });

    return {
        songUri,
        status,
        requestSongExpose,
    };
});
