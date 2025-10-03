import User from '../models/User';
import BaseRepository, { Constructor } from './BaseRepository';

// Mixin to add user-related methods to the base repository
export function AddUserRepository<TBase extends Constructor<BaseRepository>>(
	Base: TBase
) {
	return class extends Base {
		// Create a new user
		async createUser(userAttributes: {
			name: string;
			email: string;
		}): Promise<User> {
			const user = await User.create(userAttributes);
			return user;
		}

		// Get all users with a default limit
		getUsers(): Promise<User[]> {
			return User.findAll({ limit: this.defaultLimit });
		}

		// Get a user by their ID
		getUserById(id: number): Promise<User | null> {
			return User.findByPk(id);
		}

		// Get a user by their ID including soft-deleted users
		getUserByIdIncludeSoftDeletes(id: number): Promise<User | null> {
			return User.findByPk(id, { paranoid: false });
		}

		// Restore a soft-deleted user by their ID
		async restoreUserById(id: number): Promise<boolean> {
			const user = await User.findByPk(id, { paranoid: false });
			if (user && user.deleted_at) {
				// await user.restore(); // Alternatively, you can use this line
				await User.restore({ where: { id } });
				return true; // Successfully restored
			}
			
			return false; // User not found or not deleted
		}

		// Update a user by their ID
		// updateUser(id: number, updates: Partial<{ name: string; email: string }>): Promise<User | null> {
		//   return User.findByPk(id).then(user => {
		//     if (!user) return null;
		//     return user.update(updates);
		//   });
		// }

		// Update a user by their ID with error handling
		async updateUser(
			id: number,
			userAttributes: { name?: string; email?: string }
		): Promise<User> {
			// Find the user by primary key
			const userToUpdate = await this.getUserById(id);

			if (!userToUpdate) {
				throw new Error('User not found!'); // User not found
			}

			const definedUserAttributes = Object.fromEntries(
				Object.entries(userAttributes).filter(
					([_, value]) => value !== undefined
				)
			);

			userToUpdate.set(definedUserAttributes);
			await userToUpdate.save();
			return userToUpdate;
		}

		deleteUser(id: number): Promise<number> {
			return User.destroy({ where: { id } });
		}
	};
}
