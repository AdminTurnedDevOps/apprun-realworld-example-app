/**
 * Conduit API
 *
 * OpenAPI spec version: 1.0.0
 *
 */

window['defaultBasePath'] = 'https://conduit.productionready.io/api';

import { toQueryString, get, post, del, put } from './fetch';

export interface ITags {
  tags: Array<string>;
}

export interface IFeed {
  articles: Array<IArticle>;
  articlesCount: number;
}

export interface IAuthor {
  username: string;
  bio: string;
  image: string;
  following: true;
}

export interface IUser {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}
export interface ISession {
  user: IUser
}

export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: IAuthor;
  tagList: Array<string>;
}

export interface IArticlesRequest {
  tag?: string;
  author?: string;
  favorited?: string;
  limit: number;
  offset: number;
}

export const tags = {
  all: () => get<ITags>('/tags')
}

export const auth = {
  current: () =>
    get<ISession>('/user'),
  signIn: (user: { email: string, password: string }) =>
    post<ISession>('/users/login', { user }),
  register: (user: { username: string, email: string, password: string }) =>
    post<ISession>('/users', { user }),
  save: user =>
    put('/user', { user })
}

export const articles = {
  all: (request: IArticlesRequest) =>
    get<IFeed>(`/articles?${toQueryString(request)}`),
}

