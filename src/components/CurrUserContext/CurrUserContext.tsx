import { createContext } from "react";
import { User } from "@/types";

// create type and initial value for user
type UserType = User | null;
// create default params type for login, signup, and editProfile
type LoginParams = { username: string; password: string };
type SignupParams = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};
type EditProfileParams = Partial<{
  firstName: string | null;
  lastName: string | null;
  password: string | null;
  email: string | null;
}>;

// Define the initial user state
const initialUserState: User | null = null;

// typecasting all entities in CurrUserContext
const CurrUserContext = createContext<{
  user: UserType;
  logout: () => void;
  login: ({ username, password }: LoginParams) => Promise<void>;
  signup: ({
    username,
    firstName,
    lastName,
    password,
    email,
  }: SignupParams) => Promise<void>;
  editProfile: (data: EditProfileParams) => Promise<void>;
}>({
  user: initialUserState,

  // All default functions do nothing. They will be defined upon receiving values from the provider in App.
  logout: () => {},

  login: async ({ username, password }) => {
    // call placeholder variables to remove typescript-eslint/no-unused-vars error message
    console.log(`${username} ${password}`);
  },

  signup: async ({ username, firstName, lastName, password, email }) => {
    // call placeholder variables to remove typescript-eslint/no-unused-vars error message
    console.log(`${username} ${firstName} ${lastName} ${password} ${email}`);
  },

  editProfile: async (data: EditProfileParams) => {
    // call placeholder variables to remove typescript-eslint/no-unused-vars error message
    console.log(`${data}`);
  }
});

export default CurrUserContext;
