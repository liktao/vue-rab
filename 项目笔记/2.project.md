#### 1. 创建项目

```sh
npm init vue@latest
```

#### 2. 项目文件

![1](.\image\1.png)

#### 3. git 管理项目

基于 create-vue 创建出来的项目默认没有初始化 git 仓库,需要我们手动初始化

- 执行命令并完成首次提交
  1. git init
  2. git add .
  3. git commit -m "init"

#### 4. 什么是别名路径联想提示

在编写代码的过程中，一旦输入 @/ , VSCode 会立刻联想出 src 下的所有子目录和文件,统一文件路径访问不容易出错

- 如何进行配置

  1. 在项目的根目录下新增 jsconfig.json 文件
  2. 添加 json 格式的配置项，如下:

  ```json
  {
    "compilerOptions": {
      "baseUrl": "./",
      "paths": {
        // ==> 输入@自动联想src目录
        "@/*": ["src/*"]
      }
    }
  }
  ```

#### 5. Element plus 按需引入

- 安装

  ```sh
  npm install element-plus --save
  ```

- 自动导入（推荐）
  首先你需要安装 unplugin-vue-components 和 unplugin-auto-import 这两款插件

  ```sh
  npm install -D unplugin-vue-components unplugin-auto-import
  ```

  vite 中配置

  ```js
  // vite.config.ts
  import { defineConfig } from "vite";
  import AutoImport from "unplugin-auto-import/vite";
  import Components from "unplugin-vue-components/vite";
  import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

  export default defineConfig({
    // ...
    plugins: [
      // ...
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  });
  ```

#### 6. element plus 主题定制

- 为什么需要主题定制？

  小兔鲜主题色和 elementPlus 默认的主题色存在冲突，通过定制主题让 elementPlus 的主题色和小兔鲜项目保持一致

- 如何定制(scss 变量替换方案)

  - 安装 SCSS
    ```sh
    npm i sass -D
    ```
  - 准备定制样式文件

    ```
    styles/ element/index.scss
    ```

  - 对 ElementPlus 样式进行覆盖

    通知 Element 采用 scss 语言 -> 导入定制 scss 文件覆盖

  - 这里自动导入需要深入到 elementPlus 的组件中，按照官方的配置文档来

    1. 配置 elementPlus 采用 sass 样式配色系统
    2. 自动导入定制化样式文件进行样式覆盖

    ```js
    // vite.config.js
    import { fileURLToPath, URL } from "node:url";

    import { defineConfig } from "vite";
    import vue from "@vitejs/plugin-vue";

    // Element plus 按需导入
    import AutoImport from "unplugin-auto-import/vite";
    import Components from "unplugin-vue-components/vite";
    import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [
        vue(),
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          // 1.配置elementPlus采用sass样式配色系统
          resolvers: [ElementPlusResolver({ importStyle: "sass" })],
        }),
      ],
      resolve: {
        alias: {
          // 将 @ 转为 ./src
          "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@use "@/styles/element/index.scss" as *;`,
          },
        },
      },
    });
    ```

    ```scss
    // 只需重写需要的即可
    @forward "element-plus/theme-chalk/src/common/var.scss" with (
      $colors: (
        "primary": (
          "base": #27ba9b,
        ),
        "success": (
          "base": #1dc779,
        ),
        "warning": (
          "base": #ffb302,
        ),
        "danger": (
          "base": #e26237,
        ),
        "error": (
          "base": #cf4444,
        ),
      )
    );
    ```

#### 7. axios 基础配置

1. 安装 axios

   ```bash
   npm i axios
   ```

2. 基础配置

   > 官方文档地址：[https://axios-http.com/zh/docs/intro](https://axios-http.com/zh/docs/intro)
   > 基础配置通常包括：
   >
   > 1. 实例化 - baseURL + timeout
   > 2. 拦截器 - 携带 token 401 拦截等

   ```javascript
   // @/utils/http.js 为 api 服务
   import axios from "axios";

   // 创建axios实例
   const httpInstance = axios.create({
     baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
     timeout: 5000,
   });

   // axios请求拦截器
   httpInstance.interceptors.request.use(
     (config) => {
       return config;
     },
     (e) => Promise.reject(e)
   );

   // axios响应式拦截器
   httpInstance.interceptors.response.use(
     (res) => res.data,
     (e) => {
       return Promise.reject(e);
     }
   );

   export default httpInstance;
   ```

3. 封装请求函数并测试

   封装请求

   ```javascript
   import httpInstance from "@/utils/http";
   export function getCategoryAPI() {
     return httpInstance({
       url: "home/category/head",
     });
   }
   ```

   测试

   ```js
   import { getCategoryAPI } from "@/apis/test-api";
   function getCategory() {
     getCategoryAPI().then((res) => {
       console.log(res);
     });
   }

   getCategory();
   ```

4. 如果项目里面不同的业务模块需要的接口基地址不同，该如何来做?
   axios.create()方法可以执行多次，每次执行就会生成一个新的实例，比如:

   ```js
   // utils/http.js
   // 业务一
   const http1 = axios.create({
     baseURL: "url1",
     timeout: 5000,
   });

   // 业务二
   const http2 = axios.create({
     baseURL: "url2",
     timeout: 5000,
   });
   ```

#### 8. 路由整体设计

**路由设计原则：**找页面的切换方式，如果是整体切换，则为一级路由（要在 App 给一级路由出口 routerview），如果是在一级路由的内部进行的内容切换，则为二级路由（要在 layout 给二级路由出口 routerview）

```html
<template> 我是登录页 </template>
```

```html
<template> 我是首页 </template>
```

```html
<template> 我是home </template>
```

```html
<template> 我是分类 </template>
```

```javascript
// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由

import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login/index.vue";
import Layout from "@/views/Layout/index.vue";
import Home from "@/views/Home/index.vue";
import Category from "@/views/Category/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      // 要在App给一级路由出口 routerview
      path: "/",
      component: Layout,

      // 要在layout给二级路由出口 routerview
      children: [
        {
          // 默认路由设置为空 ''
          path: "",
          component: Home,
        },
        {
          path: "category",
          component: Category,
        },
      ],
    },
    {
      path: "/login",
      component: Login,
    },
  ],
});

export default router;
```

- 路由设计的依据是什么?

  内容切换的方式

- 默认二级路由如何进行设置?

  path 配置项置空

#### 9. 静态资源引入和 Error Lens 安装

1. 静态资源引入

   - 图片资源 - 把 images 文件夹放到 assets 目录下
   - 样式资源 - 把 common.scss 文件放到 styles 目录下

   - 引入初始化样式文件
      ```js
      //main.js
      import '@/styles/common.scss'

      ```

2. Error Lens 插件安装

    error lens是一个实时提供错误警告信息的VScode插件，方便开发

   ![image.png](https://cdn.nlark.com/yuque/0/2023/png/274425/1677637778086-7314f9de-8130-4388-9fc3-0cf4c59b8454.png#averageHue=%232a2e36&clientId=u68bde7ec-09c8-4&from=paste&height=196&id=udc027a23&name=image.png&originHeight=392&originWidth=1528&originalType=binary&ratio=2&rotation=0&showTitle=false&size=87943&status=done&style=none&taskId=ue37b0611-a082-4595-9dde-66e51632ef7&title=&width=764)

#### 10. scss 变量自动导入

- 为什么要自动导入
  在项目里一些组件共享的色值会以scss变量的方式统一放到一个名为 var.scss的文件中，正常组件中使用，需要先导入scss文件，再使用内部的变量，比较繁琐，自动导入可以免去手动导入的步骤，直接使用内部的变量

```css
$xtxColor: #27ba9b;
$helpColor: #e26237;
$sucColor: #1dc779;
$warnColor: #ffb302;
$priceColor: #cf4444;
```

```js
// vite.config.js
css: {
    preprocessorOptions: {
      scss: {
        // 自动导入scss文件
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `,
      }
    }
}
```

#### 11. 解决 eslint 对组件命名报错

```cjs
/* .eslintrc.cjs */
module.exports = {
  root: true,
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    // 不再强制要求组件命名
    "vue/multi-word-component-names": 0,
  },
};
```
