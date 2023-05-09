import { writable } from 'svelte/store'

export const cards = writable([]);

export const draggedCardId = writable(0); // initial value = 0