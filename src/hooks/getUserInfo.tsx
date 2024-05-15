import { User } from '@/types';
import { jwtDecode } from 'jwt-decode';
import { JoblyApi } from '@/api';

type decodedToken = {
  iat: number,
  isAdmin: boolean,
  username: string
}

async function getUserInfo(token: string): Promise<User | null> {

  // decode the token and use the username
  const decodedToken = jwtDecode<decodedToken>(token);
  const username = decodedToken.username;

  try {
    // get user info from api
    const user = await JoblyApi.getUser(username);
    return user;
  } catch (err) {
    console.error(`problem getting user: ${err}`);
    return null;
  }
}

export default getUserInfo;