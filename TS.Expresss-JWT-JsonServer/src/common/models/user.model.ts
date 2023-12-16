export interface IUser {
  id?: number;
  name: string;
  username: string;
  password: string;
}

export interface IUserDTO {
  id?: number;
  name: string;
  username: string;
}

export const UserDTO = (user: IUser): IUserDTO => {
  const { id, name, username } = user;
  return { id, name, username };
};
