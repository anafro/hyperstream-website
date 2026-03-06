import { HyperstreamEvents, Event } from "@/hyperstream/events/events";
import { defineStore } from "pinia";
import { io, Socket } from "socket.io-client";


export type UnbindCallback = () => void;


export const useEventBusStore = defineStore('event-bus', () => {
    const socketio: Socket = io({ path: "/api/v1/events" });

    function dispatch<TEventName extends keyof HyperstreamEvents & string>(
        eventName: TEventName,
        eventContent: HyperstreamEvents[TEventName] extends Event<infer TEventContent> ? TEventContent : never,
    ): void {
        const event: HyperstreamEvents[TEventName] = {
            header: {
                sid: socketio.id,
                happenedAt: Date.now(),
            },
            content: eventContent,
        } as unknown as HyperstreamEvents[TEventName];

        socketio.emit(eventName, event);
    }

    function listen<TEventName extends keyof HyperstreamEvents>(
        eventName: TEventName,
        eventListener: (event: HyperstreamEvents[TEventName]) => void,
    ): UnbindCallback {
        socketio.on(eventName as string, (bytes: ArrayBuffer) => {
            const decoder = new TextDecoder('utf-8');
            const text = decoder.decode(bytes);
            const event = JSON.parse(text);

            eventListener(event);
        });

        return (): void => {
            socketio.off(eventName as string, eventListener);
        }
    }

    return {
        dispatch,
        listen,
    };
});
