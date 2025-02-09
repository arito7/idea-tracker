import { dev } from "$app/environment";
import { Client, Databases, Account } from "appwrite";
import { env } from "$env/dynamic/private";
const client = new Client();

const EP = dev ? 'http://localhost/v1' : env.ENDPOINT
const P_ID = dev ? '67a80ed90022063b7089' : env.PROJECT_ID;
client.setEndpoint(EP).setProject(P_ID)

export const account = new Account(client)
export const databases = new Databases(client)