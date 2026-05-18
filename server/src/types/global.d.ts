export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string | null;
}

export interface UserSession extends User {
  token: string;
}

export interface SuccessResponse<T = void> {
  success: true;
  message: string;
  data?: T;
}

declare global {
  namespace Express {
    interface Request {
      user: User;
      token: UserSession['token'];
    }
  }
}
