<script setup lang="ts">
import { useThemePreferenceStore } from "@/stores/theme.ts";
import { storeToRefs } from "pinia";

const themePreference = useThemePreferenceStore();
const { materialIcon, theme, toggle } = storeToRefs(themePreference);
</script>

<template>
    <div id="base" class="bg-zinc-100 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 min-h-svh" :class="theme">
        <slot></slot>
    </div>
</template>
