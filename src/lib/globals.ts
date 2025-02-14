import { writable } from "svelte/store";

export let errorMsg = writable('');

export let postdata = writable({});