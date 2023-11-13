// 管理用户数据相关

import { defineStore } from "pinia";
import { LoginAPI } from "@/apis/user";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    // 1. 定义管理用户数据的state
    const userInfo = ref({});
    // 2. 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
      const res = await LoginAPI({ account, password });
      userInfo.value = res.result;
    };
    // 退出时清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {};
    };
    // 3. 以对象的形式把state和action return
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  }
);
