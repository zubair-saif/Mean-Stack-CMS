import { Posts } from './posts';
import { Users } from './users';

export interface Comments {

    author: string;
    message: string;
    time: Date;
    postId: Users;
    authorId: Posts;
}
