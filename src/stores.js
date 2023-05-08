import { writable } from 'svelte/store'

export const draggedCardId = writable(0); // initial value = 0

export const cards = writable();