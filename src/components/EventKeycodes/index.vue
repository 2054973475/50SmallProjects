<template>
  <div class="event-key__container">
    <div class="event-key__hint" v-if="!isEvent">
      Press any key to get the keyCode
    </div>
    <div class="event-key__content" v-if="isEvent">
      <div class="item__container">
        <div class="item__title">event.key</div>
        <div class="item__content">{{ eventKey }}</div>
      </div>
      <div class="item__container">
        <div class="item__title">event.keyCode</div>
        <div class="item__content">{{ eventKeyCode }}</div>
      </div>
      <div class="item__container">
        <div class="item__title">event.code</div>
        <div class="item__content">{{ eventCode }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";
const eventKey = <Ref<String>>ref();
const eventKeyCode = <Ref<String>>ref();
const eventCode = <Ref<String>>ref();

const isEvent = <Ref<Boolean>>ref(false);

onMounted(() => {
  window.addEventListener("keyup", (value) => {
    isEvent.value = true;
    eventKey.value = value.key;
    eventKeyCode.value = value.keyCode.toString();
    eventCode.value = value.code;
  });
});
</script>
<style lang="scss" scoped>
@mixin item {
  border: 1px solid #999999;
  background-color: #eeeeee;
  box-shadow: 1px 1px 1px #999999;
  color: black;
  text-align: center;
  font-weight: bold;
}
.event-key {
  &__container {
    height: 100vh;
    overflow: hidden;
    background-color: #e1e1e1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__hint {
    @include item;
    width: 350px;
    height: 65px;
    line-height: 65px;
    font-size: 20px;
  }
  &__content {
    display: flex;
    width: 500px;
    justify-content: space-around;
    .item {
      &__container {
        text-align: center;
      }
      &__title {
        margin-bottom: 5px;
        font-weight: bold;
      }
      &__content {
        @include item;
        line-height: 60px;
        width: 140px;
        height: 60px;
        font-size: 20px;
      }
    }
  }
}
</style>
