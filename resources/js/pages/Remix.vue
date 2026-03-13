<script setup lang="ts">
import EffectSlider from "@/components/remix/EffectSlider.vue";
import Button from "@/components/shared/Button.vue";
import H1 from "@/components/shared/H1.vue";
import HeaderVSeparator from "@/components/shared/HeaderVSeparator.vue";
import Icon from "@/components/shared/Icon.vue";
import ProfilePicture from "@/components/shared/ProfilePicture.vue";
import SearchBar from "@/components/shared/SearchBar.vue";
import Text from "@/components/shared/Text.vue";
import { useRemixer } from "@/hyperstream/hooks/remixer";
import { useSong } from "@/hyperstream/hooks/song";
import { useSongDownloaderStore } from "@/hyperstream/hooks/song-downloader";
import { useRack } from "@/hyperstream/models/rack";
import LayoutWithHeader from "@/layouts/LayoutWithHeader.vue";
import { router } from "@inertiajs/vue3";
import { get } from "@vueuse/core";
import { computed, ref, watch } from "vue";


type Props = {
    songId: string;
};

const props = defineProps<Props>();

const songId = computed(() => parseInt(props.songId));
const { song, songRequested } = useSong(get(songId));

const searchQuery = ref('');
const name = ref('');
const rack = useRack();
const { remix } = useRemixer();
const { requestDownload } = useSongDownloaderStore();

watch(rack, () => console.log(rack.value));

function remixAndToSongPage(): void {
    remix(get(songId), get(name), get(rack));
    router.visit(`/song/${get(songId)}`);
}
</script>

<template>
    <LayoutWithHeader>
        <template #header>
            <SearchBar class="grow mx-16 font-black" v-model="searchQuery"
                placeholder="Enter song name, artist name, YouTube link, YouTube id..."
                @submit="requestDownload(searchQuery)" />
        </template>

        <template #header-tray>
            <HeaderVSeparator></HeaderVSeparator>
            <ProfilePicture username="johnbrownie" class="size-8 ms-2"></ProfilePicture>
        </template>

        <H1 :skeleton="songRequested" class="mt-12 mb-4">Remixing {{ song?.title }}</H1>
        <Text :skeleton="songRequested" class="">Song by {{ song?.author }}</Text>

        <div class="grid grid-cols-6 gap-4 my-6">
            <EffectSlider v-for="(effect, i) in rack" :key="effect.id" :name="effect.name" v-model:value="rack[i].value"
                :min="effect.min" :max="effect.max">
            </EffectSlider>
        </div>
        <div class="flex items-center justify-end gap-4">
            <Button :href='`/song/${songId}`' variant='secondary'>Cancel and back to Favorites</Button>
            <Button @click="remixAndToSongPage" variant='primary'>
                <Icon class="mr-1">check</Icon>
                Request remixing
            </Button>
        </div>
    </LayoutWithHeader>
</template>
