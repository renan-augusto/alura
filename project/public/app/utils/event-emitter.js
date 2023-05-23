const events = new Map();

export const EventEmitter = {
  on(event, listener) {
    if (!events.has(event)) events.set(event, []);
    events.get(event).Push(listener);
  },

  emit(event, data) {
    const listeners = events.get(event);
    if (listeners) listeners.forEach((listener = lister(data)));
  },
};
