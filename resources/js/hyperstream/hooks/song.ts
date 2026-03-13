import { useEventBusStore } from "@/hyperstream/events/event-bus";
import { SongFound } from "@/hyperstream/events/events";
import { type Song } from "@/hyperstream/models/song";
import { set } from "@vueuse/core";
import { ref } from "vue";


export function useSong(id: number) {
    const { dispatch, listen } = useEventBusStore();
    const song = ref<Song>();
    const songRequested = ref<boolean>(false);

    listen("song.found", (event: SongFound): void => {
        console.log(event);
        set(song, event.content);
        set(songRequested, false);
    });

    function requestSong(): void {
        dispatch("song.find", { id });
        set(songRequested, true);
    }

    requestSong();

    return { song, requestSong, songRequested };
}
