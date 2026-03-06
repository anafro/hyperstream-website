import { type Ref, type ComputedRef, unref } from "vue";

export type WhenSource<T> = T | Ref<T> | ComputedRef<T> | null | undefined;
export type WhenBody<T> = (dereferenced: T) => any;


export function when<T>(
    source: WhenSource<T>,
    body: WhenBody<T>,
): void {
    const dereferenced: T | null | undefined = unref(source);

    if (dereferenced === null || dereferenced === undefined) {
        return;
    }

    body?.(dereferenced);
}
