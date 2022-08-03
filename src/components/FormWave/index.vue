<template>
  <div class="FormWave__container">
    <div class="FormWave__login-box">
      <div class="login-box__title">Please Login</div>
      <form class="login-box__login">
        <div class="input-box">
          <label ref="email" for="email">
            <span>E</span>
            <span>m</span>
            <span>a</span>
            <span>i</span>
            <span>l</span>
          </label>
          <input id="email" type="email" @click="inputClick" />
        </div>
        <div class="input-box">
          <label ref="password" for="password">
            <span>P</span>
            <span>a</span>
            <span>s</span>
            <span>s</span>
            <span>w</span>
            <span>o</span>
            <span>r</span>
            <span>d</span>
          </label>
          <input id="password" type="password" @click="inputClick" />
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { nextTick, ref, onMounted } from "vue";
const email = ref();
const password = ref();
let emailSpanList: HTMLSpanElement[];
let passwordSpanList: HTMLSpanElement[];

onMounted(() => {
  nextTick(() => {
    emailSpanList = [...email.value.children];
    passwordSpanList = [...password.value.children];

    emailSpanList.forEach((value, index) => {
      value.style.transitionDelay = `${index * 50}ms`;
    });
    passwordSpanList.forEach((value, index) => {
      value.style.transitionDelay = `${index * 50}ms`;
    });
  });
});

const inputClick = (event: MouseEvent) => {
  const input = event.target as HTMLInputElement;
  let all: HTMLSpanElement[] = [...emailSpanList, ...passwordSpanList];
  let spanList: HTMLSpanElement[];

  all.forEach((item) => {
    item.classList.remove("active");
  });
  if (input.id === "email") {
    spanList = [...emailSpanList];
  } else {
    spanList = [...passwordSpanList];
  }
  spanList.forEach((item) => {
    item.classList.add("active");
  });
};
</script>
<style lang="scss" scoped>
.FormWave {
  &__container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4682b4;
  }
  &__login-box {
    box-sizing: border-box;
    background-color: #2a4e6c;
    width: 380px;
    height: 430px;
    border-radius: 5px;
    padding: 40px;
    .login-box {
      &__title {
        color: white;
        text-align: center;
        font-size: 35px;
      }
      &__login {
        margin-top: 20px;
        .input-box {
          label {
            color: white;
            font-size: 20px;
            span {
              display: inline-block;
              transform: translateY(31px);
              transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }
            .active {
              color: #4682b4;
              transform: translateY(0px);
            }
          }
          input {
            width: 100%;
            background-color: #2a4e6c;
            border: 0;
            outline: none;
            border-bottom: 2px solid white;
            color: white;
            height: 40px;
            font-size: 20px;
            margin-bottom: 25px;
          }
        }
      }
    }
  }
}
</style>
