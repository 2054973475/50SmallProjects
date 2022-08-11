import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";

export default defineConfig({
  plugins: [
    ElementPlus({}),
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
});
