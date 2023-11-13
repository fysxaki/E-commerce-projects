// 封装购物车模块
import { ref } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore(
  "cart",
  () => {
    // 1. 定义state - cartlist
    const cartList = ref([]);
    // 2. 定义action - addCart
    const addCart = (goods) => {
      // 添加购物车操作
      // 已添加过 - count + 新添加的值
      // 未添加过 - 直接push
      // 思路 : 通过匹配传递过来的skuId能不能在cartList中找到,找到就添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId);
      if (item) {
        //找到了
        item.count++;
      } else {
        cartList.value.push(goods);
      }
    };
    return {
      cartList,
      addCart,
    };
  },
  {
    persist: true,
  }
);
