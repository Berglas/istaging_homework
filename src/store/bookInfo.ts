import { defineStore } from 'pinia';
import type { BookFormData, BookInfo } from '@/api/book';

export const useBookStore = defineStore('bookInfo', {
  state: () => {
    return {
      BookFormData: {
        id: '',
        author: '',
        description: '',
        isbn: '',
        publicationDate: '',
        title: ''
      } as BookFormData,
      BookList: [] as Array<BookInfo>,
      CurrentPage: 1
    };
  },

  actions: {
    setBookFormData(bookFormData: BookFormData) {
      this.BookFormData = bookFormData;
    },
    setBookList(bookList: Array<BookInfo>) {
      this.BookList = bookList;
    },
    setCurrentPage(currentPage: number) {
      this.CurrentPage = currentPage;
    }
  },

  persist: {
    enabled: true
  }
});
