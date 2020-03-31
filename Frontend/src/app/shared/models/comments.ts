import { Users } from './users';

export interface Comments {
    name: string;
    email: string;
    message: string;
    postId: Users;
}
