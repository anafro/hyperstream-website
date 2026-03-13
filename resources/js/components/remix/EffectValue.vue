<script setup lang="ts">
import { formatEffectValue } from '@/hyperstream/models/effect';
import { EffectTypeName } from '@/hyperstream/models/effect-type';
import { computed } from 'vue';
import Text from '@/components/shared/Text.vue';

type Props = {
    name: EffectTypeName;
    value: number;
};

const {
    name,
    value,
} = defineProps<Props>();

const formattedValue = computed(() => formatEffectValue(name, value));

</script>

<template>
    <Text>{{ formattedValue }}</Text>
</template>
