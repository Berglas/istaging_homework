import { defineStore } from 'pinia';
import type { BookFormData } from '@/api/book';

export const useBookFormDataStore = defineStore('BookFormData', {
  state: () => {
    return {
      BookFormData: {
        id: '',
        author: '',
        description: '',
        isbn: '',
        publicationDate: '',
        title: ''
      } as BookFormData
    };
  },

  actions: {
    setBookFormData(BookFormData: BookFormData) {
      this.BookFormData = BookFormData;
    }
  },

  persist: {
    enabled: true
  }
});
