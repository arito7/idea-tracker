import { getIdeas } from "$lib/ideas";

export const ssr = false;

export async function load() {
    return { ideas: await getIdeas() }
}