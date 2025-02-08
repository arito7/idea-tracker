import { ID, Query } from "appwrite";
import { databases } from "./appwrite";

const IDEAS_DATABASE_ID = '67a76f8c000e6d0ae4e2'
const IDEAS_COLLECTION_ID = '67a76fa7001fa802e72a'

export async function getIdeas() {
    return await databases.listDocuments(
        IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        [Query.orderDesc('$createdAt')]
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