<script setup lang="ts">
import { type Skeletonable } from '@/components/shared/types/skeletonable';
import Skeleton from './Skeleton.vue';

export type Props = {} & Skeletonable;

const {
    skeleton = false,
} = defineProps<Props>();
</script>

<template>
    <template v-if="skeleton">
        <Skeleton class="w-3"></Skeleton>
    </template>
    <template v-else>
        <span class="text-inherit">
            <slot></slot>
        </span>
    </template>
</template>
