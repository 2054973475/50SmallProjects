<template>
  <div class="home__container">
    <div class="home__contant">
      <div class="home__title">练习题</div>
      <ul class="home__body" @click="toPath">
        <li
          class="home__item"
          v-for="item in routeItem"
          :key="item.name"
          :data-path="item.path"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const routeItem = reactive(router.options.routes);

const toPath = (event: MouseEvent) => {
  const li:HTMLLIElement = event.target as HTMLLIElement;
  if (li.dataset.path === undefined) {
    return;
  }
  router.push(li.dataset.path)
};
</script>
<style lang="scss">
.home {
  &__container {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #2b88f0;
  }
  &__contant {
    width: 300px;
    height: 300px;
    background-color: white;
    text-align: center;
    padding: 20px;
  }
  &__title {
    font-size: 20px;
    color: black;
    font-weight: bold;
    margin-bottom: 20px;
  }
  &__body {
    border: 1px solid black;
    border-bottom: 0;
  }
  &__item {
    border-bottom: 1px solid black;
    line-height: 40px;
    height: 40px;
    font-size: 16px;
    color: black;
  }
}
</style>
