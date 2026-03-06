<script setup lang="ts">
import { ref } from "vue";


const loaded = ref(false);
</script>

<template>
<img
    class="bg-zinc-200 dark:bg-zinc-800"
    :class="{'animate-pulse': !loaded}"
    @load="loaded = true"
>
</template>
