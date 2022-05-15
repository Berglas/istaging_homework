/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ref, onMounted, watch } from 'vue';
import api from '@/api/book';
import type { BookInfo, EditBookReq, BookFormData } from '@/api/book';
import { useBookStore } from '@/store/bookInfo';
const bookStore = useBookStore();

const bookList = ref<Array<BookInfo>>([]);
const currentPage = ref<number>(1);
const onePageAmount = ref<number>(30);

export default function getBookList() {
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
    if (bookStore.BookList.length > 0) {
      bookList.value = bookStore.BookList;
    } else {
      api
        .getBookList({ page: currentPage.value, itemsPerPage: onePageAmount.value })
        .then(res => {
          bookList.value = res.data['hydra:member'];
        })
        .catch(err => {
          console.log(err);
        });
    }
  });

  // const reload = async () => {
  //   try {
  //     const { data } = await api.getVipUpgrade();
  //     vipUpgradeData.value = data.data;
  //     vipUpgradeData.value.vip_upgrade_offers.forEach(e => {
  //       const temp: Array<string> = [];
  //       e.participation_providers.forEach(i => {
  //         temp.push(i.provider_uid);
  //       });
  //       e.provider_selected = temp;
  //     });
  //     console.log('@@@', vipUpgradeData);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const nextPage = () => {
    api
      .getBookList({ page: currentPage.value, itemsPerPage: onePageAmount.value })
      .then(res => {
        bookList.value.push(...res.data['hydra:member']);
        currentPage.value += 1;
      })
      .catch(err => {
        console.log(err);
      });
  };

  return {
    bookList,
    nextPage
  };
}
