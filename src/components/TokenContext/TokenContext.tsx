import { createContext } from "react";

// create type and initial value for Token
type Token = string | null;
const initialToken: Token = null;

// set initial values for the context as [null, (anonymous function)]
const TokenContext = createContext<[Token, (value: Token) => void]>([
  initialToken,
  () => {},
]);

export default TokenContext;
