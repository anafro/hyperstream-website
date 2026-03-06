<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import LandingTitle from "@/components/pages/landing/LandingTitle.vue";
import LandingSubtitle from "@/components/pages/landing/LandingSubtitle.vue";
import Button from "@/components/shared/Button.vue";
import LayoutWithHeader from "@/layouts/LayoutWithHeader.vue";
</script>

<template>

    <Head title="Hyperstream · Your free music streaming"></Head>

    <LayoutWithHeader>
        <template #header-tray>
            <Button variant="secondary" href="/favorites">Log in</Button>
            <Button variant="primary">Sign up</Button>
        </template>

        <LandingTitle></LandingTitle>
        <LandingSubtitle></LandingSubtitle>
    </LayoutWithHeader>
</template>
