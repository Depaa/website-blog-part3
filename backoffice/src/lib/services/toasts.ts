import { writable } from 'svelte/store';
import type Toast from "./interfaces/Toast";

const toasts = writable<Toast[]>([]);

const addToast = (type: "success" | "error" | "warning", text: string) => {
    const id = Math.random().toString()
    const toast: Toast = { text: text, type: type, id }
    toasts.update((state) => [toast, ...state])
    setTimeout(() => removeToast(id), 2000)
}

const removeToast = (id: string) => {
    toasts.update((state) => {
        const newState = state.filter(t => t.id !== id)
        return newState;
    })
}

export { toasts, addToast, removeToast };

