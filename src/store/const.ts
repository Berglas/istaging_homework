import { defineStore } from 'pinia';
import { GameProvider, GameType } from '@/typeCollect/game';

export const useGameStore = defineStore('game', {
  state: () => ({
    gameTypeList: <GameType[]>[],
    gameProviderList: <GameProvider[]>[]
  }),
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setGameTypeList(gameTypeList: any) {
      this.gameTypeList = gameTypeList;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setGameProviderList(gameProviderList: any) {
      this.gameProviderList = gameProviderList;
    }
  },
  persist: {
    enabled: true
  }
});
