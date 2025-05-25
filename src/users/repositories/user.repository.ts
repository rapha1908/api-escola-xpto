import { IUser } from '../schemas/models/user.interface';
import { User } from '../schemas/user.schema';

export abstract class UserRepository {
  abstract create(userData: IUser): Promise<User>;

  abstract findAll(): Promise<User[]>;

  abstract findById(id: string): Promise<User | null>;

  abstract findByEmail(email: string): Promise<User | null>;

  abstract update(id: string, userData: Partial<IUser>): Promise<User | null>;

  abstract delete(id: string): Promise<User | null>;

  abstract findAllPaginated(page: number, limit: number): Promise<{ users: User[], total: number }>;
}