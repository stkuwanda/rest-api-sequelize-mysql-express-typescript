import {
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
} from 'sequelize';
import {
	AllowNull,
	BelongsToMany,
	Column,
	CreatedAt,
	DataType,
	Model,
	Table,
	UpdatedAt,
} from 'sequelize-typescript';
import Post from './Post';
import PostTag from './PostTag';


@Table({
	tableName: 'tags',
	modelName: 'Tag',
})
export default class Tag extends Model<
	InferAttributes<Tag>,
	InferCreationAttributes<Tag>
> {
	@Column({
		type: DataType.BIGINT.UNSIGNED,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: CreationOptional<number>;

	@AllowNull(false)
	@Column({
		type: DataType.STRING,
		unique: true,
		validate: {
			len: [1, 65], // Ensure name is between 1 and 65 characters
		},
	})
	declare name: string;

	@CreatedAt
	declare created_at: CreationOptional<Date>;

	@UpdatedAt
	declare updated_at: CreationOptional<Date>;

	@BelongsToMany(() => Post, () => PostTag)
	declare posts?: InferAttributes<Post>[]; // Optional association to avoid circular dependency issues

	// Override toJSON to exclude timestamps in responses
	public toJSON() {
		return { ...this.get(), created_at: undefined, updated_at: undefined };
	}
}
