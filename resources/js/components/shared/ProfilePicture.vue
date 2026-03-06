<script setup lang="ts">
import Image from "@/components/shared/Image.vue";
import { ref } from "vue";


type Props = {
    username: string;
};

const props = defineProps<Props>();
</script>

<template>
    <Image :src="`/@${username}/profile-picture`" alt="" class="rounded-full" aria-role="button" />
</template>
