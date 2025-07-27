export interface BDUser {
  login: string;
  password: string;
  refreshToken?: string | null;
}


export interface ProfileUser {
  name: string;
  token: string
}

export interface LoginUser {
  password: string
  login: string
}


export type Login = LoginUser['login']
