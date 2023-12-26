import { Client, Databases, ID } from "appwrite";

export const REACT_APP_PROJECT_ID = "6589746f50a0cc5b0a35";
export const REACT_APP_DATABASE_ID = "6589769390ef29dade4a";
export const REACT_APP_MESSAGES_COLLECTION_ID = "658976d395b38da9da33";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(REACT_APP_PROJECT_ID);

export const databases = new Databases(client);
export { ID };

export default client;
