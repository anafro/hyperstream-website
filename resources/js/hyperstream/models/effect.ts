import { discrete, eps } from "../support/maths/discrete";
import { EffectType, EffectTypeName, getEffectTypeByName } from "./effect-type";
import { RemixEffect } from "./remix-effect";

export type Effect = EffectType & RemixEffect;

export function mergeWithEffectMetadata(remixEffects: RemixEffect[]): Effect[] {
    return remixEffects.map((remixEffect: RemixEffect): Effect => {
        const effectType: EffectType = getEffectTypeByName(remixEffect.name);
        const effect: Effect = { ...remixEffect, ...effectType };

        return effect;
    });
}

export function formatEffectValue(name: EffectTypeName, value: number): string {
    switch (name) {
        case 'speed':
            const sign = discrete(
                value,
                { from: -Infinity, to: 1 - eps, is: '-' },
                { from: 1 - eps, to: 1 + eps, is: '' },
                { from: 1 + eps, to: +Infinity, is: '+' },
            );
            return `${sign}${Math.abs((value - 1) * 100).toFixed(0)}%`;
        case 'reverb':
        case 'noise':
        case 'crackle':
        case 'lowpass':
            return `${(value * 100).toFixed(0)}%`;
        case 'remainder':
            return `${value.toFixed(0)}s`;
    }
}

export function getEffectIcon(name: EffectTypeName, value: number): string {
    const effectType: EffectType = getEffectTypeByName(name);
    const min = effectType.min;
    const init = effectType.init;
    const max = effectType.max;

    switch (name) {
        case 'speed':
            return discrete(
                value,
                { from: min, to: 0.95, is: 'hourglass_arrow_down' },
                { from: 1 - eps, to: 1 + eps, is: 'hourglass' },
                { from: 1.05, to: max, is: 'hourglass_arrow_up' },
            );
        case 'reverb':
            return discrete(
                value,
                { from: min, to: 0.10, is: 'blur_off' },
                { from: 0.10, to: max, is: 'blur_on' },
            );
        case 'noise':
            return discrete(
                value,
                { from: min, to: 0.10, is: 'leak_remove' },
                { from: 0.10, to: max, is: 'leak_add' },
            );
        case 'crackle':
            return discrete(
                value,
                { from: min, to: 0.010, is: 'circle' },
                { from: 0.010, to: max, is: 'album' },
            );
        case 'remainder':
            return discrete(
                value,
                { from: min, to: init, is: 'circle' },
                { from: init, to: max, is: 'clock_loader_10' },
            );
        case 'lowpass':
            return discrete(
                value,
                { from: min, to: 0.20, is: 'rainy_heavy' },
                { from: 0.20, to: max, is: 'rainy_light' },
            );
        default:
            return 'question_mark';
    }
}


export function isEffectIndistinguishable(name: EffectTypeName, value: number): boolean {
    switch (name) {
        case 'speed':
            return 0.95 <= value && value <= 1.05;
        case 'noise':
            return value <= 0.10;
        case 'lowpass':
            return value <= 0.20;
        case 'reverb':
            return value <= 0.10;
        case 'remainder':
            return value <= 4;
        case 'crackle':
            return value <= 0.0005;
    }
}
