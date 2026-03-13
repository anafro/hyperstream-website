import { useEventBusStore } from "@/hyperstream/events/event-bus";
import { EffectListed } from "@/hyperstream/events/events";
import { type EffectType } from "@/hyperstream/models/effect-type";
import { set } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useEffectTypesStore = defineStore('effect-types', () => {
    const { dispatch, listen } = useEventBusStore();
    const effectTypes = ref<EffectType[]>([]);
    const effectsRequested = ref<boolean>(false);

    listen("effect.listed", (event: EffectListed): void => {
        console.log(event);
        set(effectTypes, event.content.effects);
        set(effectsRequested, false);
    });

    function requestEffects(): void {
        dispatch("effect.list", {});
        set(effectsRequested, true);
    }

    requestEffects();

    return { effectTypes, requestEffects, effectsRequested };
});
