import { MaybeRef, ref } from "vue";
import { useEventBusStore } from "../events/event-bus";
import { Rack } from "../models/rack";
import { set } from "@vueuse/core";
import { SongRemixed } from "../events/events";

export function useRemixer() {
    const { dispatch, listen } = useEventBusStore();
    const requestedSongId = ref<number | null>(null);
    const remixedSongId = ref<number | null>(null);

    function remix(songId: number, remixName: string, rack: Rack): void {
        dispatch("song.remix", { songId, name: remixName, effects: rack });
        set(requestedSongId, songId);
    }

    listen('song.remixed', (event: SongRemixed) => {
        set(remixedSongId, event.songId);
        set(requestedSongId, null);
    });

    return { remix, requestedSongId, remixedSongId };
}
