<script setup lang="ts">
import Skeleton from '@/components/shared/Skeleton.vue';
import { Skeletonable } from '@/components/shared/types/skeletonable';

const { skeleton } = defineProps<Skeletonable>();
</script>

<template>
    <Skeleton v-if="skeleton" class="h-16 w-[28em]"></Skeleton>
    <h1 v-else class="text-zinc-950 dark:text-zinc-50 text-6xl">
        <slot></slot>
    </h1>
</template>
