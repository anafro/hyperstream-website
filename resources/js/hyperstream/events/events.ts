import { type Song } from "@/hyperstream/models/song";
import { EffectType } from "@/hyperstream/models/effect-type";
import { Remix } from "@/hyperstream/models/remix";
import { Rack } from "@/hyperstream/models/rack";

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

export type SongFind = Event<Pick<Song, 'id'>>;
export type SongFound = Event<Song>;

export type SongRemix = Event<{ songId: number, effects: Rack, name: string }>;
export type SongRemixed = {
    songId: number;
};


export type EffectList = Signal;
export type EffectListed = Event<{
    effects: EffectType[],
}>;

export type RemixList = Event<{
    songId?: number,
}>;
export type RemixListed = Event<{
    songId?: number,
    remixes: Remix[],
}>;

export type RemixExpose = Event<{ id: number }>;
export type RemixExposed = Event<{
    id: number;
    uri: string;
}>;


export interface HyperstreamEvents {
    "song.download": SongDownload;
    "song.downloaded": SongDownloaded;
    "song.expose": SongExpose;
    "song.exposed": SongExposed;
    "song.list": SongList;
    "song.listed": SongListed;
    "song.find": SongFind;
    "song.found": SongFound;
    "song.remix": SongRemix;
    "song.remixed": SongRemixed;
    "effect.list": EffectList;
    "effect.listed": EffectListed;
    "remix.list": RemixList;
    "remix.listed": RemixListed;
    "remix.expose": RemixExpose;
    "remix.exposed": RemixExposed;
}
