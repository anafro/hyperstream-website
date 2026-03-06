<script setup lang="ts">
import Button from "@/components/shared/Button.vue";
import Logotype from "@/components/shared/Logotype.vue";
import Icon from "@/components/shared/Icon.vue";
import { useThemePreferenceStore } from "@/stores/theme.ts";
import { storeToRefs } from "pinia";

const themePreference = useThemePreferenceStore();
const { materialIcon, theme } = storeToRefs(themePreference);

</script>

<template>
    <header class="py-2 flex items-center justify-between">
        <Logotype variant="logo-brand"></Logotype>

        <slot></slot>

        <div class="flex gap-x-4">
            <Button variant="secondary" @click="() => themePreference.toggle()">
                <Icon>{{ theme }}_mode</Icon>
            </Button>
            <slot name="tray"></slot>
        </div>
    </header>
</template>
