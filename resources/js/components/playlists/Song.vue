<script setup lang="ts">
import Text from "@/components/shared/Text.vue";
import Image from "@/components/shared/Image.vue";
import Skeleton from "@/components/shared/Skeleton.vue";
import { formatSongLength } from "@/hyperstream/models/song";
import { computed } from "vue";


export type Props = {
    id?: number;
    author?: string;
    title?: string;
    length?: number;
    skeleton?: boolean;
}

const {
    id: _, title, author, length, skeleton = false,
} = defineProps<Props>();

const formattedLength = computed<string>((): string => formatSongLength(length ?? 0));

</script>

<template>
    <tr>
        <template v-if="skeleton">
            <td class="py-3">
                <Skeleton class="rounded-lg size-10"></Skeleton>
            </td>

            <td>
                <div class="flex items-start justify-center flex-col gap-y-3">
                    <div class="flex gap-2">
                        <Skeleton class="w-7"></Skeleton>
                        <Skeleton class="w-14"></Skeleton>
                        <Skeleton class="w-32"></Skeleton>
                    </div>
                    <div class="flex gap-2">
                        <Skeleton class="w-4"></Skeleton>
                        <Skeleton class="w-12"></Skeleton>
                    </div>
                </div>
            </td>
            <td class="text-center">
                <Skeleton class="w-7 m-auto"></Skeleton>
            </td>
        </template>
        <template v-else>
            <td class="max-w-12 py-3">
                <Image class="rounded-sm size-10" :class="{ 'animate-pulse': skeleton }"
                    :src="`/@placeholder/profile-picture/`" alt="" />
            </td>
            <td class="text-left">
                <div class="flex items-start justify-center flex-col">
                    <Text class="text-md leading-4 font-black">{{ title }}</Text>
                    <Text class="text-md">{{ author }}</Text>
                </div>
            </td>
            <td class="text-center">
                <Text>{{ formattedLength }}</Text>
            </td>
        </template>
    </tr>
</template>
