<template>
  <div class="RCP__container">
    <div class="RCP__contant">
      <div class="RCP__title">
        Enter all of the choices divided by a comma (','). Press enter when
        you're done
      </div>
      <textarea
        class="RCP__text"
        placeholder="Enter choices here..."
        v-model="data.text"
        @keydown.enter="keyEnter"
      />
      <ul class="tag__contant">
        <li
          class="tag__item"
          :class="roundNumber === index ? 'tag__item--active' : ''"
          v-for="(item, index) in data.list"
          :key="index"
          v-show="item !== ''"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, watch, ref, Ref } from "vue";
const roundNumber = <Ref<Number>>ref(-1);

const data = reactive({
  text: "",
  list: <Array<string>>[],
});

let dataList: string[] = [];

const keyEnter = () => {
  let timer: number | null = setTimeout(() => {
    dataList = data.list;
    data.text = "";
    clearTimeout(timer as number);
    timer = null;
  }, 100);
};

watch(
  () => data.text,
  (val) => {
    roundNumber.value = -1;
    data.list = val.split(",");
    if (dataList.length > data.list.length) {
      data.list = dataList;
      dataList = [];
      let i = 0;
      let timer: number | null = setInterval(() => {
        if (i === 30) {
          clearInterval(timer as number);
          timer = null;
        }
        roundNumber.value = Math.ceil(Math.random() * data.list.length);
        i++;
      }, 100);
    }
  }
);
</script>
<style lang="scss" scoped>
.RCP {
  &__container {
    height: 100vh;
    background-color: #2b88f0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__title {
    color: white;
    font-size: 21px;
    text-align: center;
    margin-bottom: 20px;
  }
  &__text {
    height: 70px;
    width: 480px;
    padding: 15px 10px;
    font-size: 16px;
  }
  &__contant {
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .tag {
      &__contant {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
      }
      &__item {
        background-color: #f0932b;
        border-radius: 20px;
        text-align: center;
        padding: 10px 20px;
        color: white;
        margin-left: 5px;
        margin-bottom: 10px;
      }
      &__item--active {
        background-color: #273c75;
      }
    }
  }
}
</style>
