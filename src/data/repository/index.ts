import BaseRepository from './BaseRepository';
import { AddUserRepository } from './AddUserRepository';

// Create an instance of the extended repository
const ExtendedRepository = AddUserRepository(BaseRepository);
const repository = new ExtendedRepository();

export default repository;