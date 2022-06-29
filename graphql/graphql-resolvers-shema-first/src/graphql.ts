
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreatePostInput {
    title: string;
    authorId: number;
}

export interface UpdatePostInput {
    id: number;
    title: string;
    authorId: number;
}

export interface Author {
    id: number;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    posts?: Nullable<Nullable<Post>[]>;
}

export interface Post {
    id: number;
    title: string;
    votes?: Nullable<number>;
    authorId: number;
}

export interface IQuery {
    author(id: number): Nullable<Author> | Promise<Nullable<Author>>;
    allPosts(): Nullable<Post>[] | Promise<Nullable<Post>[]>;
}

export interface IMutation {
    createPost(input: CreatePostInput): Post | Promise<Post>;
    update(input: UpdatePostInput): Post | Promise<Post>;
    upvotePost(postId: number): Post | Promise<Post>;
    deletePost(postId: number): Post | Promise<Post>;
}

type Nullable<T> = T | null;
