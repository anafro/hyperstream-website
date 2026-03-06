import { type Song } from "@/hyperstream/models/song";
import { SongListed } from "@/hyperstream/events/events";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useEventBusStore } from "@/hyperstream/events/event-bus";
import { set } from "@vueuse/core";


export const useSongsStore = defineStore('songs', () => {
    const { dispatch, listen } = useEventBusStore();
    const songs = ref<Song[]>([]);
    const songsRequested = ref<boolean>(false);

    listen("song.listed", (event: SongListed): void => {
        console.log(event);
        set(songs, event.content.songs);
        set(songsRequested, false);
    });

    function requestSongs(): void {
        dispatch("song.list", {});
        set(songsRequested, true);
    }

    requestSongs();

    return { songs, requestSongs, songsRequested };
});
