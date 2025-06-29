import type { EventCallback, EventMap } from '@core/types';

export class EventDispatcher<
  Events extends EventMap = Record<string, unknown>,
> {
  private listeners: {
    [K in keyof Events]?: EventCallback<Events[K]>[];
  } = {};

  on<K extends keyof Events>(
    event: K,
    callback: EventCallback<Events[K]>,
  ): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  off<K extends keyof Events>(
    event: K,
    callback: EventCallback<Events[K]>,
  ): void {
    const eventListeners = this.listeners[event];
    if (!eventListeners) return;

    const index = eventListeners.indexOf(callback);
    if (index > -1) {
      eventListeners.splice(index, 1);
    }
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    const eventListeners = this.listeners[event];
    if (!eventListeners) return;

    for (const callback of eventListeners) {
      callback(payload);
    }
  }

  clear() {
    this.listeners = {};
  }
}
