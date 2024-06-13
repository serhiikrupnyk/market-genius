export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatarUrl: string;
  planStatus: "base" | "advanced" | "premium";
}
