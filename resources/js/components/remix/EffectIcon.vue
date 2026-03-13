<script setup lang="ts">
import Icon from '@/components/shared/Icon.vue';
import { getEffectIcon } from '@/hyperstream/models/effect';
import { EffectTypeName } from '@/hyperstream/models/effect-type';
import { computed } from 'vue';

type Props = {
    name: EffectTypeName;
    value: number;
};

const {
    name,
    value,
} = defineProps<Props>();

const icon = computed(() => getEffectIcon(name, value));

</script>

<template>
    <Icon>{{ icon }}</Icon>
</template>
