<script setup lang="ts">
import { Link } from "@inertiajs/vue3";
import Text from "@/components/shared/Text.vue";

interface Props {
    variant?: "logo" | "logo-brand" | "brand";
}

const {
    variant = "logo-brand",
} = defineProps<Props>();
</script>

<template>
    <Link href="/" class="flex gap-x-2 decoration-0">
        <img class="size-[1.5rem] dark:invert" v-if="variant.includes('logo')" src="/images/logo.svg">
        <Text class="inline-block" v-if="variant.includes('brand')">Hyperstream</Text>
    </Link>
</template>
