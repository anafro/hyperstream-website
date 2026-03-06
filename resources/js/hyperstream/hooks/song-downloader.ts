import { SongDownloaded } from "@/hyperstream/events/events";
import { set } from "@vueuse/core";
import { useSongsStore } from "./songs";
import { defineStore } from "pinia";
import { useEventBusStore } from "@/hyperstream/events/event-bus";
import { ref } from "vue";

export type SongDownloadingStatus = 'idle' | 'requested' | 'downloaded' | 'fail';


export const useSongDownloaderStore = defineStore('song-downloader', () => {
    const { dispatch, listen } = useEventBusStore();
    const { requestSongs } = useSongsStore();
    const downloadingStatus = ref<SongDownloadingStatus>('idle');

    function requestDownload(query: string): void {
        dispatch('song.download', { query });
        set(downloadingStatus, 'requested');
    }

    listen('song.downloaded', (_: SongDownloaded): void => {
        set(downloadingStatus, 'downloaded');
        requestSongs();
    });

    return {
        downloadingStatus,
        requestDownload,
    }
});
