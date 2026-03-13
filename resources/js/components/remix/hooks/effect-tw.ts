import { cn } from "@/lib/utils";
import { get } from "@vueuse/core";
import { computed, MaybeRef } from "vue";

export function useEffectTailwind(indistinguishable: MaybeRef<boolean>, name: MaybeRef<string>, value: MaybeRef<number>) {

    return computed(() => cn(
        get(indistinguishable) ? 'text-zinc-300 dark:text-zinc-700' : 'text-zinc-950 dark:text-zinc-50',
        {
            'text-orange-600 dark:text-orange-400': get(name) === 'speed' && get(value) > 1,
            'text-purple-600 dark:text-purple-400': get(name) === 'speed' && get(value) < 1,
        }));
}
