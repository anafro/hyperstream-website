<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

type Props = {
    variant: "primary" | "secondary";
    disabled?: boolean;
    href?: string;
};

const emit = defineEmits<{
    click: [],
}>();

const {
    variant,
    disabled = false,
    href,
} = defineProps<Props>();

</script>

<template>
    <component :is="href ? Link : 'button'"
        class="font-black outline-none px-2 py-1 rounded-md cursor-pointer flex items-center justify-center" :class="{
            'bg-zinc-950 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950': variant === 'primary',
            'text-zinc-950 dark:text-zinc-50': variant === 'secondary',
            'opacity-20': disabled,
        }" v-bind="href ? { href } : {}" :disabled aria-role="button" @click='emit("click")'>
        <slot></slot>
    </component>
</template>
