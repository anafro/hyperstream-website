import { pad } from "../support/strings/padding";

export type Song = {
    id: number;
    title: string;
    author: string;
    length: number;
}

export function formatSongLength(length: number): string {
    const seconds: number = length % 60;
    const minutes: number = Math.floor(length / 60);

    return minutes + ':' + pad('left', String(seconds), '0', 2);
}
