<script setup lang="ts">
interface Props {
    variant?: "fill" | "outline";
}

const {
    variant = "fill",
} = defineProps<Props>();
</script>

<template>
    <span class="select-none leading-none" :class="variant === 'fill' ? 'material-symbols' : 'material-symbols-outline'">
        <slot></slot>
    </span>
</template>
