import { Client, Databases, ID, Account, Permission, Role } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.REACT_APP_DOCUMENT_ID);

export const databases = new Databases(client);
const account = new Account(client);

export default client;
export { ID, account, Permission, Role };
