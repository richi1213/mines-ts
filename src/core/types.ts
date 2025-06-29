export type EventMap = {
  [event: string]: unknown;
};

export type EventCallback<T> = (payload: T) => void;
