import { useEventBusStore } from "@/hyperstream/events/event-bus";
import { RemixListed } from "@/hyperstream/events/events";
import { get, set } from "@vueuse/core";
import { ref } from "vue";
import { Remix } from "../models/remix";


export function useRemixes(songId: number | undefined = undefined) {
    const { dispatch, listen } = useEventBusStore();
    const remixes = ref<Remix[]>([]);
    const requestedSongId = ref<number | null>(null);
    const remixesRequested = ref<boolean>(false);

    listen("remix.listed", (event: RemixListed): void => {
        console.log(event);

        if ([undefined, get(requestedSongId)].includes(event.content.songId)) {
            set(remixes, event.content.remixes);
            set(remixesRequested, false);
            set(requestedSongId, null);
        }
    });

    function requestRemixes(songId: number | undefined): void {
        dispatch("remix.list", { songId });
        set(remixesRequested, true);
        if (songId !== undefined) {
            set(requestedSongId, songId);
        }
    }

    requestRemixes(songId);

    return { remixes, remixesRequested, requestRemixes };
}
