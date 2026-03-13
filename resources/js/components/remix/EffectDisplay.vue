<script setup lang="ts">
import EffectIcon from '@/components/remix/EffectIcon.vue';
import EffectValue from '@/components/remix/EffectValue.vue';
import { isEffectIndistinguishable } from '@/hyperstream/models/effect';
import { EffectTypeName } from '@/hyperstream/models/effect-type';
import { computed } from 'vue';
import { useEffectTailwind } from './hooks/effect-tw';
import Text from '@/components/shared/Text.vue';

type Props = {
    name: EffectTypeName;
    value: number;
    labeled?: boolean;
};

const {
    name,
    value,
    labeled = false,
} = defineProps<Props>();
const indistinguishable = computed(() => isEffectIndistinguishable(name, value));
const tailwind = useEffectTailwind(indistinguishable, name, value);
</script>

<template>
    <div class="flex items-center justify-center" :class="tailwind">
        <Text v-if="labeled" class="capitalize">{{ name }}</Text>
        <EffectIcon :name :value></EffectIcon>
        <EffectValue :name :value></EffectValue>
    </div>
</template>
