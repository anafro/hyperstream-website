<script setup lang="ts">
import Header from "@/components/shared/Header.vue";
import LayoutBase from "@/layouts/LayoutBase.vue";
</script>

<template>
    <LayoutBase>
        <div class="min-h-full px-24 py-12">
            <Header>
                <slot name="header"></slot>
                <template #tray>
                    <slot name="header-tray"></slot>
                </template>
            </Header>
            <slot></slot>
        </div>
    </LayoutBase>
</template>
