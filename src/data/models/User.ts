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
	HasMany,
} from 'sequelize-typescript';
import Post from './Post';

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

	// @AllowNull(false) // Ensure name cannot be null
	// @Column({
	// 	validate: {
	// 		notEmpty: true, // Ensure name is not an empty string
	// 		len: [2, 100], // Ensure name length is between 2 and 100 characters
	// 	},
	// })
	// declare name: string;

	@AllowNull(false) // Ensure name cannot be null
	@Column({
		validate: {
			notEmpty: true, // Ensure name is not an empty string
			len: [2, 100], // Ensure name length is between 2 and 100 characters
		},
	})
	get name(): string {
		// Custom getter to always return name in uppercase
		return this.getDataValue('name').toUpperCase(); // Always return name in uppercase
	}

	// @Unique // Ensure email is unique
	// @AllowNull(false) // Ensure email cannot be null
	// @IsEmail // Validate email format
	// @Column
	// declare email: string;

	@Unique // Ensure email is unique
	@AllowNull(false) // Ensure email cannot be null
	@IsEmail // Validate email format
	@Column
	set email(value: string) {
		// Custom setter to store email in lowercase
		this.setDataValue('email', value ? value.toLowerCase() : value); // Always store email in lowercase
	}

	@CreatedAt
	declare created_at: CreationOptional<Date>;

	@UpdatedAt
	declare updated_at: CreationOptional<Date>;

	@HasMany(() => Post) // One-to-many relationship with Post model
	declare posts?: InferAttributes<Post>[]; // Optional array of associated posts

	// Override toJSON to exclude timestamps in responses
	public toJSON() {
		return { ...this.get(), created_at: undefined, updated_at: undefined };
	}
}
