import http, { HttpRes } from '../utils/http';
import { Sorted } from '@/typeCollect/common';

export type ReadBookReq = {
  page: number;
  itemsPerPage: number;
  archived?: boolean;
  'order[id]'?: Sorted;
  'order[title]'?: Sorted;
  'order[author]'?: Sorted;
  'order[isbn]'?: Sorted;
  'order[publicationDate]'?: Sorted;
  properties?: Array<string>;
  title?: string;
  author?: string;
};

export type ReadBookRes = {
  '@context': string;
  '@id': string;
  '@type': string;
  'hydra:member': Array<BookInfo>;
  'hydra:search': string;
  'hydra:totalItems': string;
  'hydra:view': number;
};

export type BookInfo = {
  '@context'?: string;
  '@id'?: string;
  '@type'?: string;
  author: string;
  description: string;
  id: string;
  isbn: string;
  publicationDate: string;
  reviews?: Array<Review>;
  title: string;
};

export type Review = {
  '@context'?: string;
  '@id': string;
  '@type': string;
  id?: string;
  body: string;
  description: string;
  rating?: number;
  book?: string;
  author?: string;
  publicationDate?: string;
};

export type AddBookReq = {
  author: string;
  description: string;
  isbn?: string;
  publicationDate: string;
  title: string;
  reviews: Array<Review>;
  cover: string;
  archivedAt: string;
};

export type AddBookRes = {
  '@context': string;
  '@id': string;
  '@type': string;
  id: string;
  author: string;
  description: string;
  isbn: string;
  publicationDate: string;
  title: string;
  reviews: Array<Review>;
  cover: string;
  archivedAt: string;
};

export type EditBookReq = {
  author?: string;
  description?: string;
  id: string;
  isbn?: string;
  publicationDate?: string;
  title?: string;
};

export type EditBookRes = AddBookRes;

export type BookFormData = {
  author: string;
  description: string;
  id?: string;
  isbn?: string;
  publicationDate: string;
  title: string;
};

const api = {
  getBookList: (params: ReadBookReq): Promise<HttpRes<ReadBookRes>> => {
    return http.get('/https://cors-anywhere-dot-vr-cam-161603.uc.r.appspot.com/books');
  },
  addBook: (params: AddBookReq): Promise<HttpRes<AddBookRes>> => {
    return http.post('/https://cors-anywhere-dot-vr-cam-161603.uc.r.appspot.com/books', params);
  },
  editBook: (params: EditBookReq): Promise<HttpRes<EditBookRes>> => {
    return http.patch(`/https://cors-anywhere-dot-vr-cam-161603.uc.r.appspot.com/books/${params.id}`, params);
  }
};

export default api;
