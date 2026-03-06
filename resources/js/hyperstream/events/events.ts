import { type Song } from "@/hyperstream/models/song";

export interface EventHeader {
    happenedAt: number;
    sid?: string;
}

export interface Event<TContent = unknown> {
    header: EventHeader;
    content: TContent;
}

export type Signal = Event<{}>;

export type SongDownload = Event<{
    query: string,
}>;

export type SongDownloaded = Event<Song>;

export type SongExpose = Event<Pick<Song, 'id'>>;

export type SongExposed = Event<{
    uri: string,
} & Song>;

export type SongList = Signal;
export type SongListed = Event<{
    songs: Song[],
}>;

export interface HyperstreamEvents {
    "song.download": SongDownload;
    "song.downloaded": SongDownloaded;
    "song.expose": SongExpose;
    "song.exposed": SongExposed;
    "song.list": SongList;
    "song.listed": SongListed;
}
