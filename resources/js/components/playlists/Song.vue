<script setup lang="ts">
import EffectDisplay from "@/components/remix/EffectDisplay.vue";
import Button from "@/components/shared/Button.vue";
import Icon from "@/components/shared/Icon.vue";
import Image from "@/components/shared/Image.vue";
import Skeleton from "@/components/shared/Skeleton.vue";
import Text from "@/components/shared/Text.vue";
import { Effect } from "@/hyperstream/models/effect";
import { getEffectNameById } from "@/hyperstream/models/effect-type";
import { formatSongLength } from "@/hyperstream/models/song";
import { Link } from "@inertiajs/vue3";
import { computed } from "vue";
import ProfilePicture from "../shared/ProfilePicture.vue";

export type Props = {
    id?: number;
    author?: string;
    title?: string;
    remixedBy?: string;
    effects?: Effect[],
    length?: number;
    skeleton?: boolean;
    playing?: boolean;
    variant?: 'song' | 'remix';
}

const emit = defineEmits<{
    play: [],
}>();

const {
    id = null, title = 'Unknown', author = 'Unknown', remixedBy, effects, length, skeleton = false, playing = false, variant = 'song'
} = defineProps<Props>();

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
            <td v-if="variant === 'remix'" class="text-center">
                <div class="flex gap-1.5 items-center justify-center">
                    <template v-for="_ in 5">
                        <Skeleton class="size-4 rounded-full"></Skeleton>
                        <Skeleton class="w-6 me-2"></Skeleton>
                    </template>
                </div>
            </td>
            <td v-if="variant === 'remix'" class="text-center">
                <div class="flex gap-1 items-center justify-center">
                    <Skeleton class="size-4 rounded-full"></Skeleton>
                    <Skeleton class="w-10"></Skeleton>
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
                        variant="secondary" @click="emit('play')">
                        <Icon variant="fill">{{ playing ? 'pause' : 'play_arrow' }}</Icon>
                    </Button>
                </div>
            </td>
            <td class="text-left">
                <div class="flex items-start justify-center flex-col">
                    <Link :href="id === null ? '#' : `/song/${id}`"
                        class="text-md leading-4 font-black hover:underline">{{ title }}
                    </Link>
                    <Text class="text-md">{{ author }}</Text>
                </div>
            </td>
            <td v-if="variant === 'remix'" class="text-center">
                <div class="flex gap-x-2 items-center justify-center w-full">
                    <EffectDisplay v-for="effect in effects" :name="getEffectNameById(effect.id)" :value="effect.value">
                    </EffectDisplay>
                </div>
            </td>
            <td v-if="variant === 'remix'" class="text-center">
                <div class="flex gap-1 items-center justify-center">
                    <ProfilePicture class="size-4 rounded-full" :username="remixedBy!"></ProfilePicture>
                    <Text>{{ remixedBy }}</Text>
                </div>
            </td>
            <td class="text-center">
                <Text>{{ formattedLength }}</Text>
            </td>
        </template>
    </tr>
</template>
