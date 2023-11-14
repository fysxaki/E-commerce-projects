// 封装购物车模块
import { computed, ref } from "vue";
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

    // 删除购物车
    const delCart = (skuId) => {
      //思路:
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId);
      cartList.value.splice(idx, 1);
    };

    // 单选功能
    const singleCheck = (skuId, selected) => {
      // 通过skuId找到要修改的那一项, 然后把他的selected修改为新的传过来的值
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    //计算属性
    //  1.总数量 所有项的count之和
    const allCount = computed(() =>
      cartList.value.reduce((allSum, item) => allSum + item.count, 0)
    );
    // 2.总价 所有项的count*price之和
    const allPrice = computed(() =>
      cartList.value.reduce(
        (allSum, item) => allSum + item.price * item.count,
        0
      )
    );
    return {
      cartList,
      allCount,
      allPrice,
      addCart,
      delCart,
      singleCheck,
    };
  },
  {
    persist: true,
  }
);
