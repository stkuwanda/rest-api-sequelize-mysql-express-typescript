import BaseRepository from './BaseRepository';
import { AddUserRepository } from './AddUserRepository';
import { AddPostRepository } from './AddPostRepository';

// Create an instance of the extended repository
const ExtendedRepository = AddPostRepository(AddUserRepository(BaseRepository));
const repository = new ExtendedRepository();

export default repository;