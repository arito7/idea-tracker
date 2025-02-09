import { getIdeas } from "$lib/ideas";

export const ssr = false;
export const prerender = true;

export async function load() {
    return { ideas: await getIdeas() }
}