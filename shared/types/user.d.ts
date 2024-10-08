export interface User {
    name: string;
    age: number;
    email: string;
    role: string;
    _id?: string;
  }
  
  export type UserRole = 'admin' | 'user' | 'guest';