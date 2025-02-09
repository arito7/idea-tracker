import { dev } from "$app/environment";
import { Client, Databases, Account } from "appwrite";
const client = new Client();

const EP = dev ? 'http://localhost/v1' : "https://cloud.appwrite.io/v1"
const P_ID = dev ? '67a80ed90022063b7089' : "67a7686f0026476fde72"
client.setEndpoint(EP).setProject(P_ID)

export const account = new Account(client)
export const databases = new Databases(client)