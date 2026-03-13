<script setup lang="ts">
import Text from "@/components/shared/Text.vue";

type Props = {
    variant?: 'songs' | 'remixes';
};

const {
    variant = 'songs',
} = defineProps<Props>();
</script>

<template>
    <table class="w-full">
        <thead
            class="sticky top-0 z-10 bg-gradient-to-b from-zinc-100 from-75% to-transparent to-100% dark:from-zinc-950">
            <tr>
                <th class="text-left w-16 py-4">
                    <Text>Cover</Text>
                </th>
                <th class="text-left">
                    <Text>Title</Text>
                </th>
                <th v-if="variant === 'remixes'">
                    <Text>Effects</Text>
                </th>
                <th v-if="variant === 'remixes'">
                    <Text>Remixed by</Text>
                </th>
                <th class="text-right w-8">
                    <Text>Length</Text>
                </th>
            </tr>
        </thead>

        <tbody>
            <slot></slot>
        </tbody>
    </table>
</template>
