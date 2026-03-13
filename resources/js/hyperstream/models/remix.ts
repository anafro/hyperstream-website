import { Effect } from "@/hyperstream/models/effect";

export type Remix = {
    id: number;
    songId: number;
    name: string;
    effects: Effect[];
    remixedBy: string;
    length: number;
}
