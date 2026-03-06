export function chain(...functions: (() => unknown)[]): void {
    for (const func of functions) {
        func();
    }
}
