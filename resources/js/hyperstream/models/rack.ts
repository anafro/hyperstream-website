import { useEffectTypesStore } from "@/hyperstream/hooks/effects";
import { Effect } from "@/hyperstream/models/effect";
import { EffectType } from "@/hyperstream/models/effect-type";
import { get, set, watchOnce } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { Ref, ref } from "vue";

export type Rack = Effect[];

export function useRack(): Ref<Rack> {
    const { effectTypes } = storeToRefs(useEffectTypesStore());
    const rack = ref<Rack>([]);

    watchOnce(effectTypes, (): void => {
        set(rack, get(effectTypes).map((type: EffectType): Effect => ({ value: type.init, ...type })));
    })

    return rack;
}
