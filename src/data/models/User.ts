import {
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from 'sequelize';
import {
	Table,
	Column,
	Model,
	DataType,
	Unique,
	UpdatedAt,
	CreatedAt,
	AllowNull,
	IsEmail,
} from 'sequelize-typescript';

@Table({
	tableName: 'users',
	modelName: 'User',
})
export default class User extends Model<
	InferAttributes<User>,
	InferCreationAttributes<User>
> {
	@Column({
		type: DataType.BIGINT,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: CreationOptional<number>;

	@AllowNull(false) // Ensure name cannot be null
	@Column({
		validate: {
			notEmpty: true, // Ensure name is not an empty string
			len: [2, 100], // Ensure name length is between 2 and 100 characters
		},
	})
	declare name: string;

	@Unique // Ensure email is unique
	@AllowNull(false) // Ensure email cannot be null
	@IsEmail // Validate email format
	@Column
	declare email: string;

	@CreatedAt
	declare createdAt: CreationOptional<Date>;

	@UpdatedAt
	declare updatedAt: CreationOptional<Date>;

  // Override toJSON to exclude timestamps in responses
	public toJSON() {
		return { ...this.get(), createdAt: undefined, updatedAt: undefined };
	}
}
