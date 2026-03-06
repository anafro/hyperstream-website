<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    variant?: "fill" | "outline";
}

const {
    variant = "outline",
} = defineProps<Props>();
const fillFontVariation = computed(() => variant === 'outline' ? 0 : 1);

</script>

<template>
    <span class="material-symbols-outlined icon select-none leading-none">
        <slot></slot>
    </span>
</template>

<style scoped>
.icon {
    font-variation-settings: 'FILL' v-bind(fillFontVariation);
}
</style>
