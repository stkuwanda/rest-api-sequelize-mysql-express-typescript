import User from '../models/User';
import BaseRepository, { Constructor } from './BaseRepository';

// Mixin to add post-related methods to the base repository
export function AddPostRepository<TBase extends Constructor<BaseRepository>>(
  Base: TBase 
) {
  return class extends Base {
    // Create a new post associated with a user
    createUserPost(user: User, postAttributes: { title: string; body: string }){
      return user.$create('post', postAttributes); // Using the association method to create a post for the user
    }
  }
}