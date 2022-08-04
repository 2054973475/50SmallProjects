<template>
  <div class="KL__container">
    <div ref="triangle1" class="KL__triangle1"></div>
    <div ref="triangle2" class="KL__triangle2"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref, onMounted, onBeforeUnmount } from "vue";
const triangle1 = <Ref<HTMLDivElement>>ref();
const triangle2 = <Ref<HTMLDivElement>>ref();
let triangle1Rotate = 90;
let triangle2Rotate = 0;
let clearInterval = 0;
onMounted(() => {
  let triangleState = 0;
  // mySetInterval(() => {
  //   if (!triangleState) {
  //     triangle1.value.style.transform = `translate(-50%, -50%) rotate(${(triangle1Rotate += 180)}deg)`;
  //     triangleState++;
  //   } else {
  //     triangle2.value.style.transform = `translate(-50%, -50%) rotate(${(triangle2Rotate += 180)}deg)`;
  //     triangleState--;
  //   }
  // }, 500);
});
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
onBeforeUnmount(() => {
  cancelAnimationFrame(clearInterval);
});
</script>
<style lang="scss" scoped>
@mixin triangle {
  position: absolute;
  border: 50px solid transparent;
  border-bottom: 50px solid white;
  left: 50%;
  top: 50%;
  transform-origin: 50% 50%;
  transition: all 0.5s linear;
}
.KL {
  &__container {
    height: 100vh;
    background-color: #2c3e50;
    position: relative;
  }
  &__triangle1 {
    @include triangle();
    transform: translate(-50%, -50%) rotate(90deg);
    animation: rotateB 2s linear infinite;
  }
  &__triangle2 {
    @include triangle();
    animation: rotateA 2s linear infinite 0.5s;
    transform: translate(-50%, -50%) rotate(0deg);
  }
  @keyframes rotateA {
    0%,
    25% {
      transform: rotate(0deg);
    }

    50%,
    75% {
      transform: rotate(180deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes rotateB {
    0%,
    25% {
      transform: rotate(90deg);
    }

    50%,
    75% {
      transform: rotate(270deg);
    }

    100% {
      transform: rotate(450deg);
    }
  }
}
</style>
