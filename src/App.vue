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
  <!-- <RouterLink>

  </RouterLink> -->
  <!-- {{ list }} -->
  <RouterView></RouterView>
</template>

<style scoped>
  header {
    line-height: 1.5;
    max-height: 100vh;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
  }

  nav a.router-link-exact-active {
    color: var(--color-text);
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }

  nav a:first-of-type {
    border: 0;
  }

  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
      margin: 0 2rem 0 0;
    }

    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }

    nav {
      text-align: left;
      margin-left: -1rem;
      font-size: 1rem;

      padding: 1rem 0;
      margin-top: 1rem;
    }
  }
</style>
