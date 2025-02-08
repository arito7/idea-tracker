import { Client, Databases, Account } from "appwrite";

const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('67a7686f0026476fde72')

export const account = new Account(client)
export const databases = new Databases(client)