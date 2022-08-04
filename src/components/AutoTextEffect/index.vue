<template>
  <div class="ATE__container">
    <div class="ATE__text">{{ ATEtext }}</div>
    <div class="ATE__settings">
      <label for="speed">Speed:</label>
      <input
        @change="setSpeed"
        type="number"
        id="speed"
        v-model="ATEspeed"
        min="1"
        max="10"
        step="1"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Ref, ref, onMounted } from "vue";
const ATEtext = <Ref<string>>ref("");
const ATEspeed = <Ref<number>>ref(1);
const text = "We Love Programming!";
const textArr = [...text];
let textIndex = 0;
let clearInterval = 0;
onMounted(() => {
  mySetInterval(() => {
    ATEtext.value += textArr[textIndex];
    textIndex++;
    if (textIndex > textArr.length) {
      textIndex = 0;
      ATEtext.value = "";
    }
  }, 200);
});
const setSpeed = () => {
  cancelAnimationFrame(clearInterval)
  mySetInterval(() => {
    ATEtext.value += textArr[textIndex];
    textIndex++;
    if (textIndex > textArr.length) {
      textIndex = 0;
      ATEtext.value = "";
    }
  }, 10 * (11-ATEspeed.value));
};
const mySetInterval = (fn: Function, time: number) => {
  let count = (time / 1000) * 60;
  const Interval = () => {
    clearInterval = requestAnimationFrame(() => {
      if (count <= 0) {
        fn();
        count = (time / 1000) * 60;
      } else {
        count -= 1;
      }
      Interval();
    });
  };
  Interval();
};
</script>
<style lang="scss">
.ATE {
  &__container {
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e9967a;
    position: relative;
  }
  &__text {
    color: black;
    font-size: 30px;
    font-weight: bold;
  }
  &__settings {
    position: absolute;
    bottom: 10%;
    margin: auto;
    width: 150px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    color: black;
    background-color: rgba(0, 0, 0, 0.1);
    #speed {
      height: 30px;
      background-color: #e9967a;
      border: 0;
      font-size: 20px;
      width: 40px;
      padding: 2px 2px 2px 8px;
      outline: none;
    }
  }
}
</style>
