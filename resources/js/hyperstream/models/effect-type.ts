import { storeToRefs } from "pinia";
import { useEffectTypesStore } from "../hooks/effects";
import { get } from "@vueuse/core";

export type EffectTypeName = 'speed' | 'reverb' | 'lowpass' | 'noise' | 'crackle' | 'remainder';

export type EffectType = {
    id: number;
    name: EffectTypeName;
    min: number;
    init: number;
    max: number;
};


export function getEffectTypeById(id: number): EffectType {
    const { effectTypes: effects } = storeToRefs(useEffectTypesStore());
    const effectType: EffectType | undefined = get(effects).find((type: EffectType) => type.id === id);

    if (effectType === undefined) {
        throw new Error(`There's no such effect type with id of ${id}.`);
    }

    return effectType;
}

export function getEffectTypeByName(name: string): EffectType {
    const { effectTypes: effects } = storeToRefs(useEffectTypesStore());
    const effectType: EffectType | undefined = get(effects).find((type: EffectType) => type.name === name);

    if (effectType === undefined) {
        throw new Error(`There's no such effect type with name ${name}.`);
    }

    return effectType;
}

export function getEffectNameById(id: number): EffectTypeName {
    const effectType = getEffectTypeById(id);
    return effectType.name;
}
