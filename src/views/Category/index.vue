<script setup>
  import { getCategoryAPI } from "@/apis/category";

  import { ref, onMounted } from "vue";

  import { useRoute, onBeforeRouteUpdate } from "vue-router";

  import GoodsItem from "../Home/components/GoodsItem.vue";

  // 请求分类数据
  // 获取路由
  const route = useRoute();
  const categoryData = ref({});
  const getCategory = async (id=route.params.id) => {
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

    getCategory(to.params.id)
  });

  // 请求banner数据
  import { getBannerAPI } from "@/apis/home";
  const bannerList = ref([]);
  const getBanner = async () => {
    const res = await getBannerAPI({ distributionSite: "2" });
    bannerList.value = res.result;

    // console.log(res);
  };

  onMounted(() => getBanner());
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 轮播图 -->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img v-img-lazy="item.imgUrl" src="" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <RouterLink to="/">
              <img v-img-lazy="i.picture" src="" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div
        class="ref-goods"
        v-for="item in categoryData.children"
        :key="item.id"
      >
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .top-category {
    h3 {
      font-size: 28px;
      color: #666;
      font-weight: normal;
      text-align: center;
      line-height: 100px;
    }

    .sub-list {
      margin-top: 20px;
      background-color: #fff;

      ul {
        display: flex;
        padding: 0 32px;
        flex-wrap: wrap;

        li {
          width: 168px;
          height: 160px;

          a {
            text-align: center;
            display: block;
            font-size: 16px;

            img {
              width: 100px;
              height: 100px;
            }

            p {
              line-height: 40px;
            }

            &:hover {
              color: $xtxColor;
            }
          }
        }
      }
    }

    .ref-goods {
      background-color: #fff;
      margin-top: 20px;
      position: relative;

      .head {
        .xtx-more {
          position: absolute;
          top: 20px;
          right: 20px;
        }

        .tag {
          text-align: center;
          color: #999;
          font-size: 20px;
          position: relative;
          top: -20px;
        }
      }

      .body {
        display: flex;
        justify-content: space-around;
        padding: 0 40px 30px;
      }
    }

    .bread-container {
      padding: 25px 0;
    }

    // 部分代码省略
    .home-banner {
      width: 1240px;
      height: 500px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 500px;
      }
    }
  }
</style>
