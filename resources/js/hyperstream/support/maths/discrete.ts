export type TDiscreteRange<TDiscrete> = {
    from: number,
    to: number,
    is: TDiscrete,
}

export const eps: number = 10e-6;

export function discrete<TDiscrete>(value: number, ...ranges: TDiscreteRange<TDiscrete>[]): TDiscrete {
    for (const { from, to, is: discrete } of ranges) {
        if (from <= value && value <= to) {
            return discrete;
        }
    }

    throw new Error(`Value is out of discrete ranges: ${JSON.stringify(ranges)}`);
}
