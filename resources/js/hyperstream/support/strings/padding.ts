export type Padding = 'left' | 'right' | 'center';

export function pad(padding: Padding, str: string, char: string, desiredLength: number): string {
    if (char.length !== 1) {
        throw new Error(`leftPad's char length must be 1, not ${char.length}.`);
    }

    if (desiredLength <= 0) {
        throw new Error(`leftPad's desiredLength must be <= 0, not ${desiredLength}.`);
    }

    const length: number = str.length;
    const paddingLength = desiredLength - length;

    if (length >= desiredLength) {
        return str;
    }

    switch (padding) {
        case 'left':
            return char.repeat(paddingLength) + str;
        case 'right':
            return str + char.repeat(paddingLength);
        case 'center':
            return '' +
                char.repeat(Math.floor(paddingLength / 2)) +
                str +
                char.repeat(Math.ceil(paddingLength / 2));
    }
}
