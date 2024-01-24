export const isBrowser = typeof window != "undefined" && window.localStorage;

export const getStoredUserId = () => {
  if (isBrowser) {
    const userId: string | null = window.localStorage.getItem("userId");
    if (userId) return userId;
  }
};

/**
 * returns true or false if user is authenticated
 * just check against hardcoded username & password
 * */
export const loginUser = async (
  username: string,
  password: string
): Promise<string | undefined> => {
  const storedUser = getStoredUserId();
  if (storedUser) return storedUser;

  // TODO: create lamdba function and api route to handle user auth
  if (username === "jane_doe" && password === "password") {
    // store user id in local storage
    if (isBrowser) {
      window.localStorage.setItem("userId", "1");
    }
    return "1";
  }
};

// TODO: implement a working sign out function
export const signOut = async (): Promise<boolean> => {
  if (isBrowser) {
    window.localStorage.removeItem("userId");
  }
  return true;
};

export const getData = async (_id: string) => {
  let data;

  // TODO: hardcoded for now, authenticate user credentials for later.
  const accountId = "1";

  const dataFromStore = isBrowser
    ? window.localStorage.getItem("deckItems")
    : undefined;

  if (!dataFromStore) {
    const API_URL = process.env.NEXT_PUBLIC_AWS_API_URL as string;
    console.log("fetching from database...");
    const res = await fetch(`https://${API_URL}/decks?AccountId=${accountId}`);
    data = await res.json();
    data = data["Items"];
    console.log("data returned from db", JSON.stringify(data));
    window.localStorage.setItem("deckItems", JSON.stringify(data));
  } else {
    console.log("retrieving data from store");
    data = JSON.parse(dataFromStore);
    console.log("data returned from store", data);
  }
  return data;
};
