import { writable } from "svelte/store";
import { ID } from "appwrite";
import { goto } from "$app/navigation";
import { account } from "./appwrite";

const isBrowser = typeof window != 'undefined';

const createUser = () => {
    const store = writable(null)

    async function init() {
        if (!isBrowser) return;

        try {
            store.set(await account.get());
        } catch (error) {
            store.set(null)
        }
    }

    init();

    async function register(email: string, password: string, name: string) {
        if (!isBrowser) return;

        await account.create(ID.unique(), email, password, name)
        await login(email, password)

    }

    async function login(email: string, password: string) {
        if (!isBrowser) return

        await account.createEmailPasswordSession(email, password)
        await init();
        goto('/')
    }

    async function logout() {
        await account.deleteSession('current')
        store.set(null)
    }

    return {
        subscribe: store.subscribe,
        register,
        login,
        logout,
        init
    }
}


export const user = createUser();