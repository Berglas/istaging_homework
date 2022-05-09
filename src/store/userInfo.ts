import { defineStore } from 'pinia';

// type UserInfo = {
//   level: number;
//   referrer_uid: string;
//   uid: string;
//   username: string;
//   referral: string;
// };

export const useUserInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      userInfo: {
        level: 0,
        referrer_uid: '',
        uid: '',
        username: '',
        referral: ''
      }
    };
  },

  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    }
  },

  persist: {
    enabled: true
  }
});
