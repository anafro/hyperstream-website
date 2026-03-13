import { get, set } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useEventBusStore } from "../events/event-bus";
import { RemixExposed } from "../events/events";


export type RemixExposeStatus = 'idle' | 'requested' | 'exposed' | 'fail';


export const useRemixExposeStore = defineStore('remix-expose', () => {
    const { dispatch, listen } = useEventBusStore();
    const remixUri = ref<string | null>(null);
    const requestedId = ref<number | null>(null);
    const status = ref<RemixExposeStatus>('idle');

    function requestRemixExpose(id: number): void {
        dispatch('remix.expose', { id: id });
        set(requestedId, id);
        set(status, 'requested');
    }

    listen('remix.exposed', (event: RemixExposed): void => {
        if ([null, event.content.id].includes(get(requestedId))) {
            set(remixUri, event.content.uri);
            set(status, 'exposed');
        }
    });

    return {
        remixUri,
        status,
        requestRemixExpose,
    };
});
