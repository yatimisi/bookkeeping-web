export class User {
  id: number;
  email: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;

  get fullName(): string {
    return `${this.firstName}${this.lastName}`.trim();
  }
}
