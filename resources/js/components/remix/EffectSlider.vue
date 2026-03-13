<script setup lang="ts">
import { EffectTypeName } from '@/hyperstream/models/effect-type';
import EffectIcon from '@/components/remix/EffectIcon.vue';
import { useEffectTailwind } from './hooks/effect-tw';
import { formatEffectValue, isEffectIndistinguishable } from '@/hyperstream/models/effect';
import { computed } from 'vue';
import { get } from '@vueuse/core';
import { cn } from '@/lib/utils';
import Text from '@/components/shared/Text.vue';

type Props = {
    name: EffectTypeName;
    min: number;
    max: number;
};

const {
    name,
} = defineProps<Props>();
const value = defineModel<number>('value', { required: true });
const indistinguishable = computed(() => isEffectIndistinguishable(name, get(value)));

const tailwind = useEffectTailwind(indistinguishable, name, value)
</script>

<template>
    <div class="flex flex-col items-center justify-center w-full rounded-md bg-zinc-200 dark:bg-zinc-900 p-6">
        <Text :class="cn(tailwind, 'capitalize text-lg font-black')">{{ name }}</Text>
        <EffectIcon :class="cn(tailwind, 'text-9xl! mb-2')" :name :value></EffectIcon>
        <Text :class="cn(tailwind, 'capitalize mb-1')">{{ formatEffectValue(name, value) }}</Text>
        <input class="w-full" v-model.number="value" type="range" :min :max :step="0.05">
    </div>
</template>
