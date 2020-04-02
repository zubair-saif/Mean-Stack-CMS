import { Users } from './users';

export interface Posts {

    title: string;
    content: string;
    readTime: number;
    preview: string;
    like: number;
    imageLink: string;
    imagesContent: [];
    tag: [];
    author: Users;
    authorId: Users;
}

