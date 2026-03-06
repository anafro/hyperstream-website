<script setup lang="ts">
import { useSongExposeStore } from "@/hyperstream/hooks/song-expose";
import { storeToRefs } from "pinia";

interface Props {

}

const {

} = defineProps<Props>();

const {
    songUri,
} = storeToRefs(useSongExposeStore());
</script>

<template>
    <div
        class="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-100 from-75% to-transparent to-100% dark:from-zinc-950 flex items-center justify-center gap-x-12 mx-12">
        <audio class="w-full bg-zinc-100 dark:bg-zinc-950" controls v-if="songUri !== null" :src="songUri"></audio>
    </div>
</template>
