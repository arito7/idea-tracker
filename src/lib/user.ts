import { writable } from "svelte/store";
import { ID } from "appwrite";
import { goto } from "$app/navigation";
import { account } from "./appwrite";
import { errorMsg } from "./globals";

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

        const res = await account.create(ID.unique(), email, password, name)
            .then(() => {
                login(email, password)
            }).catch((e) => {
                errorMsg.set(e.message)
            })
    }

    async function login(email: string, password: string) {
        if (!isBrowser) return

        const res = await account.createEmailPasswordSession(email, password).then(res => {
        }).then(() => {
            init();
        }).then(() => {
            goto('/')
        }).catch((e) => {
            errorMsg.set(e.message)
        })
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