import { Ref, ref, onMounted, watch } from 'vue';
import api from '@/api/book';
import type { BookInfo } from '@/api/book';
import { useBookStore } from '@/store/bookInfo';

interface GetBookList {
  bookList: Ref<Array<BookInfo>>;
  hasNextPage: Ref<boolean>;
  reload(): void;
  nextPage(): void;
}

export default function getBookList(): GetBookList {
  const bookStore = useBookStore();
  const bookList = ref<Array<BookInfo>>([]);
  const currentPage = ref<number>(1);
  const onePageAmount = ref<number>(30);
  const hasNextPage = ref<boolean>(true);
  watch(
    () => currentPage.value,
    newVal => {
      bookStore.setCurrentPage(newVal);
    },
    { immediate: false }
  );

  watch(
    () => bookList.value,
    newVal => {
      bookStore.setBookList(newVal);
    },
    { immediate: false }
  );

  onMounted(() => {
    // reload();
    // if (bookStore.BookList.length > 0) {
    //   bookList.value = bookStore.BookList;
    // } else {
    //   api
    //     .getBookList({ page: currentPage.value, itemsPerPage: onePageAmount.value })
    //     .then(res => {
    //       bookList.value = res.data['hydra:member'];
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  });

  const reload = async () => {
    api
      .getBookList({ page: currentPage.value, itemsPerPage: onePageAmount.value })
      .then(res => {
        bookList.value = res.data['hydra:member'];
      })
      .catch(err => {
        console.log(err);
      });
  };

  const nextPage = () => {
    if (hasNextPage.value) {
      api
        .getBookList({ page: currentPage.value, itemsPerPage: onePageAmount.value })
        .then(res => {
          if (res.data['hydra:member'].length < onePageAmount.value) {
            hasNextPage.value = false;
          }
          bookList.value.push(...res.data['hydra:member']);
          currentPage.value += 1;
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return {
    bookList,
    reload,
    nextPage,
    hasNextPage
  };
}
