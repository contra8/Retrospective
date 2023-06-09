import { writable } from 'svelte/store'

export const startCards = writable([]);
export const stopCards = writable([]);
export const continueCards = writable([]);

export const draggedCardId = writable(0); // initial value = 0
export const draggedCardType = writable();