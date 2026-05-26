type EventPayload = Record<string, string | undefined | null>;

interface Tracker {
  track(event: string, payload?: EventPayload): void;
}

const posthogAdapter: Tracker = {
  track(event, payload) {
    window.posthog?.capture(event, payload);
  },
};

let adapter: Tracker = posthogAdapter;

export function track(event: string, payload?: EventPayload): void {
  adapter.track(event, payload);
}

export function setTracker(t: Tracker): void {
  adapter = t;
}
