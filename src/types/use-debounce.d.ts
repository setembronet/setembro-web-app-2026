declare module 'use-debounce' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export function useDebouncedCallback<T extends (...args: any[]) => any>(
        callback: T,
        delay: number,
        options?: { maxWait?: number; leading?: boolean; trailing?: boolean }
    ): T;
}
