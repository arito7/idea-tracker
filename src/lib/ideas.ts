import { ID, Query, type QueryTypesList } from "appwrite";
import { databases } from "./appwrite";
import { dev } from "$app/environment";

const IDEAS_DATABASE_ID = dev ? '67a81075002ac7c5b826' : '67a76f8c000e6d0ae4e2'
const IDEAS_COLLECTION_ID = dev ? '67a8108e0015118b03b7' : '67a76fa7001fa802e72a'

export async function getIdeas(lastIdea?: string) {
    let query = [Query.orderDesc('$createdAt'), Query.limit(5)]
    if (lastIdea) {
        query.push(Query.cursorAfter(lastIdea))
    }
    if (dev) {
        await new Promise(res => setTimeout(() => {
            res(200)
        }, 2000))
    }
    return await databases.listDocuments(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        query
    )
}

export async function addIdea(userId: string, title: string, description?: string) {
    await databases.createDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, ID.unique(), {
        userId,
        title,
        description
    })
}

export async function deleteIdea(id: string) {
    let i = await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id).then((res) => {
        console.log('test', res)

    }).catch(e => {
        console.log(e)
    })
    console.log(i)
}