export class User {
  id: number;
  email: string;
  profile?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;

  get fullName(): string {
    return `${this.firstName}${this.lastName}`.trim();
  }
}
