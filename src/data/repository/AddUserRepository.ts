import User from '../models/User';
import BaseRepository, { Constructor } from './BaseRepository';

// Mixin to add user-related methods to the base repository
export function AddUserRepository<TBase extends Constructor<BaseRepository>>(
	Base: TBase
) {
	return class extends Base {
		async createUser(userAttributes: {
			name: string;
			email: string;
		}): Promise<User> {
			const user = await User.create(userAttributes);
			return user;
		}

		getUsers(): Promise<User[]> {
			return User.findAll({ limit: this.defaultLimit });
		}

		getUserById(id: number): Promise<User | null> {
			return User.findByPk(id);
		}
	};
}
