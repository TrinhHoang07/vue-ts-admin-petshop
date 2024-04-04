import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

type Admin = {
  name?: string;
  email?: string;
  phone?: string;
  token?: string;
};

export const useSession = defineStore('infoUser', () => {
  const infos = reactive<{ isAuth: boolean; admin: Admin }>({
      isAuth: false,
      admin: {},
  });

  const setSessions = (isAuth: boolean, data: Admin) => {
      infos.isAuth = isAuth;
      infos.admin = data;
  };

  return { infos, setSessions };
});