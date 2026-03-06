<script setup lang="ts">
import Text from "@/components/shared/Text.vue";

interface Props {

}

const {

} = defineProps<Props>();
</script>

<template>
    <div
        class="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-100 from-75% to-transparent to-100% dark:from-zinc-950 flex items-center justify-center gap-x-12 mx-12">
        <Text>0:51</Text>
        <input type="range" class="flex-1 accent-zinc-700 dark:accent-zinc-300">
        <Text>5:39</Text>
    </div>
</template>
