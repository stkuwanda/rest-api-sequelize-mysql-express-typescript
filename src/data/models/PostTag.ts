import {
	InferAttributes,
	InferCreationAttributes,
} from 'sequelize';
import {
	Column,
	ForeignKey,
	Model,
	Table,
	DataType,
} from 'sequelize-typescript';
import Post from './Post';
import Tag from './Tag';

// Join table model for Post and Tag many-to-many relationship
@Table({
	tableName: 'post_tag',
	modelName: 'PostTag',
	timestamps: false, // No timestamps needed for join table
})
export default class PostTag extends Model<
	InferAttributes<PostTag>,
	InferCreationAttributes<PostTag>
> {
  // Composite primary key consisting of post_id and tag_id
	@ForeignKey(() => Post)
	@Column({
		type: DataType.BIGINT.UNSIGNED,
		allowNull: false,
		primaryKey: true,
	})
	declare post_id: number;

  // Composite primary key consisting of post_id and tag_id
	@ForeignKey(() => Tag)
	@Column({
		type: DataType.BIGINT.UNSIGNED,
		allowNull: false,
		primaryKey: true,
	})
	declare tag_id: number;
}
