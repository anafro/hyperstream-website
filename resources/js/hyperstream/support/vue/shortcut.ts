import { useMagicKeys, UseMagicKeysReturn, whenever } from "@vueuse/core";


export type Shortcut = keyof UseMagicKeysReturn<true>;
export type ShortcutBody = () => any;
export type ShortcutReturn = void;

export function onShortcut(shortcut: Shortcut, body: ShortcutBody): ShortcutReturn {
    const keys = useMagicKeys();
    whenever(keys[shortcut], body);
}


