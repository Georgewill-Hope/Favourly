import {
  Account,
  Avatars,
  Client,
  ID,
  Query,
  TablesDB,
} from "react-native-appwrite";

const client: Client = new Client();
client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

const account: Account = new Account(client);
const avatars: Avatars = new Avatars(client);
const tablesDB = new TablesDB(client);
const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const tableId = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

export const Register = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const newAccount = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });

    if (!newAccount) throw new Error("Something went wrong!");

    const avatarUrl = avatars.getInitialsURL(name);

    await login(email, password);

    const newUser = await tablesDB.createRow({
      databaseId: databaseId,
      tableId: tableId,
      rowId: ID.unique(),
      data: {
        name: name,
        email: email,
        avatar: avatarUrl,
        accountId: newAccount.$id,
      },
    });

    if (!newUser) throw new Error("Something went wrong!");

    return newUser;
  } catch (error) {
    throw error;
  }
};
export const login = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });
    if (!session) throw new Error("Something went wrong!");
    return session;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentUser = await account.get();
    if (!currentUser) throw new Error("Something went wrong!");

    const findUser = await tablesDB.listRows({
      databaseId: databaseId,
      tableId: tableId,
      queries: [Query.equal("accountId", currentUser.$id)],
    });
    if (!findUser) throw new Error("Something went wrong");
    return findUser.rows[0]
  } catch (error) {
    return null;
  }
};

export const SignOut = async () => {
  try {
    const session = await account.deleteSession({
      sessionId: "current",
    });

    return session;
  } catch (error) {
    throw error;
  }
};

