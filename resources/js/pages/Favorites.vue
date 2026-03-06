<script setup lang="ts">
import { ref } from "vue";
import LayoutWithHeader from "@/layouts/LayoutWithHeader.vue";
import H1 from "@/components/shared/H1.vue";
import SearchBar from "@/components/shared/SearchBar.vue";
import ProfilePicture from "@/components/shared/ProfilePicture.vue";
import HeaderVSeparator from "@/components/shared/HeaderVSeparator.vue";
import Playlist from "@/components/playlists/Playlist.vue";
import Song from "@/components/playlists/Song.vue";
import { useSongsStore } from "@/hyperstream/hooks/songs";
import DownloadingSong from "@/components/playlists/DownloadingSong.vue";
import { useSongDownloaderStore } from "@/hyperstream/hooks/song-downloader";
import { storeToRefs } from "pinia";
import PlayerTimeline from "@/components/playlists/PlayerTimeline.vue";


const searchQuery = ref('');
const { songs, songsRequested } = storeToRefs(useSongsStore());
const { requestDownload } = useSongDownloaderStore();
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

        <H1 class="mt-12 mb-6">Your favorites</H1>
        <Playlist>
            <DownloadingSong></DownloadingSong>
            <template v-if="songsRequested">
                <Song v-for="_ in 12" skeleton></Song>
            </template>
            <Song v-else v-for="song in songs" :id="song.id" :title="song.title" :author="song.author"
                :length="song.length" cover-src="/@anafro/profile-picture" :effects="[]"></Song>
        </Playlist>

        <PlayerTimeline></PlayerTimeline>
    </LayoutWithHeader>
</template>
