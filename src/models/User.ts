export interface BDUser {
  login: string;
  password: string
}


export interface ProfileUser {
  name: string;
  token: string
}

export interface LoginUser {
  password: string
  login: string
}


export interface UserBase {
  name: string;
  password: string,
  id: number
}

export type Login = LoginUser['login']
