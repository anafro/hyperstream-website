<script setup lang="ts">
import DownloadingSong from "@/components/playlists/DownloadingSong.vue";
import PlayerTimeline from "@/components/playlists/PlayerTimeline.vue";
import Playlist from "@/components/playlists/Playlist.vue";
import Song from "@/components/playlists/Song.vue";
import Button from "@/components/shared/Button.vue";
import H1 from "@/components/shared/H1.vue";
import HeaderVSeparator from "@/components/shared/HeaderVSeparator.vue";
import Icon from "@/components/shared/Icon.vue";
import ProfilePicture from "@/components/shared/ProfilePicture.vue";
import SearchBar from "@/components/shared/SearchBar.vue";
import Text from "@/components/shared/Text.vue";
import { useRemixExposeStore } from "@/hyperstream/hooks/remix-expose";
import { useRemixer } from "@/hyperstream/hooks/remixer";
import { useRemixes } from "@/hyperstream/hooks/remixes";
import { useSong } from "@/hyperstream/hooks/song";
import { useSongDownloaderStore } from "@/hyperstream/hooks/song-downloader";
import { useSongExposeStore } from "@/hyperstream/hooks/song-expose";
import LayoutWithHeader from "@/layouts/LayoutWithHeader.vue";
import { get } from "@vueuse/core";
import { computed, ref, watch } from "vue";


type Props = {
    songId: string;
};

const props = defineProps<Props>();

const songId = computed(() => parseInt(props.songId));
const { remixes, requestRemixes, remixesRequested } = useRemixes(get(songId));
const { song, songRequested } = useSong(get(songId));

const searchQuery = ref('');
const { requestDownload } = useSongDownloaderStore();
const { remixedSongId } = useRemixer();
const { requestSongExpose } = useSongExposeStore();
const { requestRemixExpose } = useRemixExposeStore();

watch(remixedSongId, () => {
    if (get(remixedSongId) === get(songId)) {
        requestRemixes(get(songId));
    }
});

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

        <div class="flex items-end justify-between">
            <H1 :skeleton="songRequested" class="mt-12 mb-4">{{ song?.title }}</H1>
            <Button :href="`/remix/${songId}`" variant="primary">
                <Icon>instant_mix</Icon>
                <Text class="ms-1">Create a remix</Text>
            </Button>
        </div>
        <Text :skeleton="songRequested" class="">Song by {{ song?.author }}</Text>
        <Playlist variant="songs">
            <DownloadingSong></DownloadingSong>
            <template v-if="songRequested">
                <Song skeleton></Song>
            </template>
            <Song v-else :id="song?.id" :title="song?.title" :author="song?.author" :length="song?.length"
                cover-src="/@anafro/profile-picture" :effects="[]" @play="song?.id && requestSongExpose(song.id)">
            </Song>
        </Playlist>

        <H1 :skeleton="songRequested" class="mt-12 mb-4">Remixes</H1>
        <Playlist variant="remixes">
            <template v-if="remixesRequested || songRequested">
                <Song variant="remix" v-for="_ in 8" skeleton></Song>
            </template>
            <Song variant="remix" v-else v-for="remix in remixes" :id="song?.id" :title="song?.title"
                :author="song?.author" :remixed-by="remix.remixedBy" :effects="remix.effects" :length="remix.length"
                cover-src="/@anafro/profile-picture" @play="requestRemixExpose(remix.id)"></Song>
        </Playlist>

        <PlayerTimeline></PlayerTimeline>
    </LayoutWithHeader>
</template>
