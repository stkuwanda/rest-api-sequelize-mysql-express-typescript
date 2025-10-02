import {
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from 'sequelize';
import {
	AllowNull,
	BeforeCreate,
	BelongsTo,
	BelongsToMany,
	Column,
	CreatedAt,
	DataType,
	ForeignKey,
	Model,
	Table,
	UpdatedAt,
} from 'sequelize-typescript';
import User from './User';
import Tag from './Tag';
import PostTag from './PostTag';

@Table({
	tableName: 'posts',
	modelName: 'Post',
})
export default class Post extends Model<
	InferAttributes<Post>,
	InferCreationAttributes<Post>
> {
	@Column({
		type: DataType.BIGINT,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: CreationOptional<number>;

	@ForeignKey(() => User) // Foreign key association with User model
	@AllowNull(true)
	@Column({ type: DataType.BIGINT })
	declare user_id: number | null;

	@AllowNull(false)
	@Column
	declare title: string;

	@AllowNull(false)
	@Column(DataType.TEXT)
	declare body: string;

	@Column({
		type: DataType.STRING,
		unique: true,
	})
	declare slug: string;

	@CreatedAt
	declare created_at: CreationOptional<Date>;

	@UpdatedAt
	declare updated_at: CreationOptional<Date>;

	// @BelongsTo(() => User) // Association with User model
	// declare user: User;

	@BelongsTo(() => User) // Association with User model
	declare author?: InferAttributes<User>; // Optional association to avoid circular dependency issues

	@BelongsToMany(() => Tag, () => PostTag) // Many-to-many association with Tag model through PostTag
	declare tags?: InferAttributes<Tag>[]; // Optional association to avoid circular dependency issues

	@BeforeCreate // Hook to generate slug before creating a post
	static async generateSlug(instance: Post) {
		// Check if the slug already exists in the database
		const count = await Post.count({
			where: { title: instance.title },
		});

		// If a post with the same title exists, append a suffix to make the slug unique
		let suffix = '';
		if (count > 0) {
			suffix = `-${count + 1}`; // Append a suffix if the slug already exists
		}

		console.log(`Suffix to be added: ${suffix}`);

		// Generate a unique slug based on the title
		instance.slug = instance.title
			.toLowerCase() // Convert to lowercase
			.replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
			.replace(/^-+|-+$/g, '') // Trim leading and trailing hyphens
		+ suffix; // Append the suffix if necessary
	}

	// Override toJSON to exclude timestamps in responses
	public toJSON() {
		return {
			...this.get(),
			user_id: undefined,
			createdAt: undefined,
			updatedAt: undefined,
		};
	}
}
