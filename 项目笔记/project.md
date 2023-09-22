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
