//封装分类数据业务相关代码

import { getCategoryAPI } from "@/apis/category";
import { ref, onMounted } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";

export function useCategory() {
  // 请求分类数据
  // 获取路由
  const route = useRoute();
  const categoryData = ref({});
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id); // 这里id是RouterLink里面给的
    // console.log("categoryData: ", res.result);
    categoryData.value = res.result;
  };

  onMounted(() => getCategory()); // 走默认参数

  /**
   * onBeforeRouteUpdate(to, from, next)
   * 在当前路由改变，但是该组件被复用时调用
   * 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
   * 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
   * 可以访问组件实例 `this`
   */
  /**
   * 业务分析：
   * 路由改变：只有分类数据变化，Banner数据则不用变化，所以只需要重新请求分类数据
   */

  //目标:路由参数变化的时候可以把分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    // 存在问题：获取不到最新的路由，因为路由还没完全切换过去
    // getCategory();

    getCategory(to.params.id);
  });

  return { categoryData };
}
