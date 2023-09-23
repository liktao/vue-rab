<!--LayoutFiexd.vue 实现吸顶交互--->
<script setup>
  // vueUse
  import { useScroll } from "@vueuse/core";

  import { useCategoryStore } from "@/stores/category";
  import { storeToRefs } from "pinia";

  // 获取滚动距离，smooth 平滑滚动
  const { y } = useScroll(window, { behavior: "smooth" }); // 窗口滚动位置

  // 使用 pinia 的 category
  const category = useCategoryStore();
  // 解构 store
  const { categoryList } = storeToRefs(category);
</script>

<template>
  <div class="app-header-sticky" :class="{ show: y > 78 }">
    <div class="container">
      <RouterLink exact-active-class="active" class="logo" to="/" />
      <!-- 导航区域 -->
      <ul class="app-header-nav">
        <li class="home">
          <RouterLink exact-active-class="active" to="/">首页</RouterLink>
        </li>
        <li class="home" v-for="item in categoryList" :key="item.id">
          <RouterLink
            exact-active-class="active"
            :to="`/category/${item.id}`"
            >{{ item.name }}</RouterLink
          >
        </li>
      </ul>

      <div class="right">
        <RouterLink exact-active-class="active" to="/">品牌</RouterLink>
        <RouterLink exact-active-class="active" to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .app-header-sticky {
    width: 100%;
    height: 80px;

    //  fixed 定位
    // 元素的位置相对于浏览器窗口是固定位置。
    // 即使窗口是滚动的它也不会移动
    position: fixed;
    left: 0;
    top: 0;

    z-index: 999;
    background-color: #ffffff;
    border-bottom: 1px solid #e4e4e4;
    // 此处为关键样式!!!
    // 状态一：往上平移自身高度 + 完全透明
    transform: translateY(-100%); // 移出去窗口外了
    opacity: 0;

    // 状态二：移除平移 + 完全不透明
    &.show {
      transition: all 0.3s linear;
      transform: none;
      opacity: 1;
    }

    .container {
      display: flex;
      align-items: center;
    }

    .logo {
      width: 200px;
      height: 80px;
      background: url("@/assets/images/logo.png") no-repeat right 2px;
      background-size: 160px auto;
    }

    .right {
      width: 220px;
      display: flex;
      text-align: center;
      padding-left: 40px;
      border-left: 2px solid $xtxColor;

      a {
        width: 38px;
        margin-right: 40px;
        font-size: 16px;
        line-height: 1;

        &:hover {
          color: $xtxColor;
        }
      }
    }
  }

  .app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;

    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;

      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;

        &:hover {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
        }
      }

      .active {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }
  }
</style>
