import { useEffect, useRef } from "react";

    export default function useEventListener(
        eventType:string,
        callback:(event: Event) => void,
        element:(HTMLElement | Window | undefined) = typeof window !== "undefined" ? window : undefined,
        ) {
        const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const handler = (e: Event) => callbackRef.current(e);
        const element= typeof window !== "undefined" ? window : undefined;
        element && element.addEventListener(eventType, handler);

        return () => element && element.removeEventListener(eventType, handler);
    }, [eventType, element]);
}
