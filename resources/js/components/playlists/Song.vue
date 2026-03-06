<script setup lang="ts">
import Text from "@/components/shared/Text.vue";
import Image from "@/components/shared/Image.vue";
import Skeleton from "@/components/shared/Skeleton.vue";
import { formatSongLength } from "@/hyperstream/models/song";
import { computed } from "vue";
import Button from "@/components/shared/Button.vue";
import Icon from "../shared/Icon.vue";
import { storeToRefs } from "pinia";
import { useSongExposeStore } from "@/hyperstream/hooks/song-expose";


export type Props = {
    id?: number;
    author?: string;
    title?: string;
    length?: number;
    skeleton?: boolean;
    playing?: boolean;
}

const {
    id = null, title = 'Unknown', author = 'Unknown', length, skeleton = false, playing = false,
} = defineProps<Props>();

const { songUri } = storeToRefs(useSongExposeStore());
const { requestSongExpose } = useSongExposeStore();
const formattedLength = computed<string>((): string => formatSongLength(length ?? 0));
const playable = computed(() => id !== null);

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
                <div class="size-10 relative rounded-sm contain-paint">
                    <Image class="size-full absolute inset-0" :class="{ 'animate-pulse': skeleton }"
                        :src="`/@placeholder102/profile-picture/`" alt="" />
                    <Button v-if="playable"
                        class="opacity-0 absolute inset-0 rounded-none bg-zinc-100/50 dark:bg-zinc-950/50 hover:opacity-100 transition-colors"
                        variant="secondary" @click="requestSongExpose(id!)">
                        <Icon variant="fill">{{ playing ? 'pause' : 'play_arrow' }}</Icon>
                    </Button>
                </div>
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
