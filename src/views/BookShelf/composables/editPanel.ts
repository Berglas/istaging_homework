import { Router, useRouter } from 'vue-router';
import type { BookInfo, BookFormData } from '@/api/book';
import { useBookStore } from '@/store/bookInfo';
import { formatTime } from '@/utils/format';

interface EditPanel {
  goToDetail(data: BookInfo): void;
}

export default function editPanel(): EditPanel {
  const bookStore = useBookStore();
  const router: Router = useRouter();

  const goToDetail = (data: BookInfo) => {
    const bookData: BookFormData = {
      id: data.id,
      author: data.author,
      title: data.title,
      isbn: data.isbn,
      description: data.description,
      publicationDate: formatTime(data.publicationDate, 'YYYY-MM-DD')
    };
    bookStore.setBookFormData(bookData);
    router.push({
      name: 'BookDetail'
    });
  };

  return {
    goToDetail
  };
}
