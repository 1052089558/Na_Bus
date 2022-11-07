import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";


export default defineConfig({
  plugins: [vue()],
   // 引入全局基础css

css: {
  // loaderOptions: {
  //    sass: {
  //             prependData: `@import "./src/common/css";`   
  //         }
  //    }
},



  // './'解决打包后访问空白页面的问题
  // publicPath: './',
  // 打包配置
  resolve: {
    alias: {
      "@": path.resolve('src'),
      comps: path.resolve(__dirname, "src/components"),
    },
  },
  server: {			
    host: '0.0.0.0'	
  },						
  build: {
    outDir: "dist", //指定输出路径
    assetsDir: "assets", // 指定生成静态资源的存放路径
    minify: "terser", // 混淆器，terser构建后文件体积更小
    terserOptions: {
      // 生产环境移除console
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
