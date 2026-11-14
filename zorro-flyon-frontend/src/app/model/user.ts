export interface User {
  id: string | null;
  profileId: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string | null;
  createdAt: Date;
  verified: boolean;
}
