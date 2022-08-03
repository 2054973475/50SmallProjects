<template>
  <div class="DW__container">
    <div class="DW__header">
      <div class="header__title">Drink Water</div>
      <div class="header__title--small">Goal: 2 Liters</div>
    </div>
    <div class="DW__body">
      <div class="big-water__conatiner">
        <div ref="bwSpace" class="big-water__space">
          <div class="big-water__title">2L</div>
          <div class="big-water__title--small">Remained</div>
        </div>
        <div ref="bwContent" class="big-water__content">0%</div>
      </div>
      <p class="body__hint">
        Select how many glasses of water that you have drank
      </p>
      <ul class="small-water__container" @click="addWater">
        <li
          class="small-water__item"
          :class="index >= item ? 'small-water__item--active' : ''"
          v-for="item in dataList"
          :data-index="item"
          :key="item"
        >
          250<br />ml
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, Ref } from "vue";
const bwContent = <Ref<HTMLDivElement>>ref();
const bwSpace = <Ref<HTMLDivElement>>ref();

const index = <Ref<number>>ref(-1);
const dataList = reactive([1, 2, 3, 4, 5, 6, 7, 8]);
const addWater = (event: MouseEvent) => {
  const li = event.target as HTMLLIElement;
  if (li.dataset.index === undefined) {
    return;
  }
  if (index.value === Number(li.dataset.index)) {
    index.value -= 1;
  } else {
    index.value = Number(li.dataset.index);
  }
  bwSpace.value.children[0].innerHTML = (2 - index.value * 0.25)+'L';
  bwSpace.value.style.bottom = (index.value / dataList.length) * 100 + "%";
  bwContent.value.innerText = (index.value / dataList.length) * 100 + "%";
  bwContent.value.style.top = 100 - (index.value / dataList.length) * 100 + "%";
};
</script>
<style lang="scss" scoped>
.DW {
  &__container {
    background-color: #3494e4;
    min-height: 750px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__header {
    margin-top: 20px;
    text-align: center;
    line-height: 40px;
    .header {
      &__title {
        color: white;
        font-size: 35px;
        font-weight: bold;
      }
      &__title--small {
        color: white;
        font-size: 20px;
      }
    }
  }
  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    .big-water {
      &__conatiner {
        margin-top: 30px;
        height: 320px;
        width: 140px;
        background-color: white;
        border: 4px solid #144fc6;
        border-bottom-left-radius: 40px;
        border-bottom-right-radius: 40px;
        position: relative;
        overflow: hidden;
      }
      &__space {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #144fc6;
        transition: all 0.2s linear;
      }
      &__title {
        font-size: 20px;
        font-weight: bold;
      }
      &__content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 100%;
        color: #144fc6;
        font-weight: bold;
        font-size: 30px;
        background-color: #6ab3f8;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        transition: all 0.2s linear;
      }
    }
    .body__hint {
      color: white;
      margin-top: 20px;
      font-size: 16px;
    }
    .small-water {
      &__container {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        width: 280px;
      }
      &__item {
        margin-left: 10px;
        margin-bottom: 12px;
        height: 100px;
        width: 45px;
        background-color: white;
        border: 4px solid #144fc6;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #144fc6;
        font-size: 16px;
        cursor: pointer;
      }
      &__item--active {
        color: white;
        background-color: #6ab3f8;
      }
    }
  }
}
</style>
