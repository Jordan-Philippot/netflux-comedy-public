export interface UserType {
  id: number;
  email: string;
  roles: string[];
  password?: string;
  createdAt: string;
  firstname: string;
  lastname: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterType {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface ProfileType {
  password: string;
  firstname: string;
  lastname: string;
}
