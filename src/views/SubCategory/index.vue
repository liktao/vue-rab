<script setup>
  import GoodsItem from "@/views/Home/components/GoodsItem.vue";
  import { getCategoryFilterAPI, getSubCategoryAPI } from "@/apis/category";
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";

  // 获取面包屑数据
  const route = useRoute();
  const categoryData = ref([]);

  const getCategoryFilter = async () => {
    const res = await getCategoryFilterAPI(route.params.id);
    // console.log(res);
    categoryData.value = res.result;
  };

  onMounted(() => {
    getCategoryFilter();
  });

  // 获取基础列表数据渲染
  const goodList = ref([]);
  const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: "publishTime" | "orderNum" | "evaluateNum",
  });

  const getSubCategory = async () => {
    const res = await getSubCategoryAPI(reqData.value);
    // console.log(res);
    goodList.value = res.result.items;
  };

  onMounted(() => getSubCategory());

  // 实现列表筛选功能，tab
  function handleClick() {
    // console.log(tab);
    reqData.value.page = 1;
    getSubCategory();
    // console.log(reqData.value.sortField);
  }

  // 列表无限加载功能实现
  const disabled = ref(false);
  const load = async () => {
    console.log("加载更多数据咯");
    // 获取下一页的数据
    reqData.value.page++;
    const res = await getSubCategoryAPI(reqData.value);
    goodList.value = [...goodList.value, ...res.result.items];
    // 加载完毕 停止监听
    if (res.result.items.length === 0) {
      disabled.value = true;
    }
  };
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }"
          >{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs
        v-infinite-scroll="load"
        v-model="reqData.sortField"
        @tab-click="handleClick"
      >
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body">
        <!-- 商品列表-->
        <GoodsItem v-for="good in goodList" :good="good" :key="good.id" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .bread-container {
    padding: 25px 0;
    color: #666;
  }

  .sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
      display: flex;
      flex-wrap: wrap;
      padding: 0 10px;
    }

    .goods-item {
      display: block;
      width: 220px;
      margin-right: 20px;
      padding: 20px 30px;
      text-align: center;

      img {
        width: 160px;
        height: 160px;
      }

      p {
        padding-top: 10px;
      }

      .name {
        font-size: 16px;
      }

      .desc {
        color: #999;
        height: 29px;
      }

      .price {
        color: $priceColor;
        font-size: 20px;
      }
    }

    .pagination-container {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
  }
</style>
