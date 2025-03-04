export interface IUser {
  _id:string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  userPackLists:[
    { 
      id:string,
      name:string,
      items:string[],
    }
  ];
}

export interface ICurrentUser extends IUser {
  token: string;
  refreshToken?: string;
}

export interface IResetPassword {
  new_password: string;
}

export interface IForgotPassword {
  email: string;
}

