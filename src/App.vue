<script setup>

  // import { getCategoryAPI } from "@/apis/test-api";
  // import { ref } from "vue";

  // let list = reactive({}); list = {};// 直接赋新值丢失响应式

  // let list = ref({});
  // function getCategory() {
  //   getCategoryAPI().then((res) => {
  //     // console.log(res.result);
  //     list.value = res.result[0];
  //     console.log(list);
  //   });
  // }

  // getCategory()
</script>

<template>
  
  <!-- 一级路由出口组件 -->
  <RouterView></RouterView>
</template>

<style scoped>
 
</style>
