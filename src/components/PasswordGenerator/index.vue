<template>
  <div class="PG__container">
    <div class="PG__content">
      <div class="PG__title">Password Generator</div>
      <div class="PG__password" id="password">
        {{ password
        }}<span
          class="PG__copy"
          :data-clipboard-text="password"
          @click="copyPassword"
          >cp</span
        >
      </div>
      <form>
        <div class="PG__item">
          <div class="item__name">Password Length</div>
          <input
            class="item__number"
            type="number"
            max="20"
            min="4"
            step="1"
            v-model="form.length"
          />
        </div>
        <div class="PG__item">
          <div class="item__name">Include uppercase letters</div>
          <input
            class="item__checkbox"
            type="checkbox"
            v-model="form.uppercase"
          />
        </div>
        <div class="PG__item">
          <div class="item__name">Include lowercase letters</div>
          <input
            class="item__checkbox"
            type="checkbox"
            v-model="form.lowercase"
          />
        </div>
        <div class="PG__item">
          <div class="item__name">Include numbers</div>
          <input
            class="item__checkbox"
            type="checkbox"
            v-model="form.numbers"
          />
        </div>
        <div class="PG__item">
          <div class="item__name">Include symbols</div>
          <input
            class="item__checkbox"
            type="checkbox"
            v-model="form.symbols"
          />
        </div>
        <input
          class="PG__submit"
          type="submit"
          @click="formSubmit"
          value="Generate Password"
        />
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref, reactive } from "vue";
import ClipboardJS from "clipboard";
const password = <Ref<string>>ref("");
interface Form {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}
const form: Form = reactive({
  length: 10,
  uppercase: false,
  lowercase: false,
  numbers: false,
  symbols: false,
});
const copyPassword = () => {
  const clipboard = new ClipboardJS(".PG__copy");
  clipboard.on("success", (e) => {
    clipboard.destroy();
  });
  clipboard.on("error", (e) => {
    clipboard.destroy();
  });
};
const formSubmit = () => {
  if (!form.uppercase && !form.lowercase && !form.numbers && !form.symbols) {
    return;
  }
  let index = 0;
  let count: number = form.length;
  const rondowPassowrd = new Map();
  let passwordArr = <Array<string>>[];
  if (form.uppercase) rondowPassowrd.set(index++, rondowUppercase);
  if (form.lowercase) rondowPassowrd.set(index++, rondowLowercase);
  if (form.numbers) rondowPassowrd.set(index++, rondowNumber);
  if (form.symbols) rondowPassowrd.set(index++, rondowSymbols);

  while (count > 0) {
    let i = Math.floor(Math.random() * rondowPassowrd.size);
    passwordArr.push(rondowPassowrd.get(i)());
    if (count === 1 && !testing(passwordArr)) {
      count = form.length + 1;
      passwordArr = [];
    }
    count--;
  }
  password.value = passwordArr.join("");
};
const testing = (passwordArr: string[]): boolean => {
  const password = passwordArr.join("");
  if (form.uppercase) {
    if (!/[A-Z]/.test(password)) return false;
  }
  if (form.numbers) {
    if (!/[0-9]/.test(password)) return false;
  }
  if (form.lowercase) {
    if (!/[a-z]/.test(password)) return false;
  }

  if (form.symbols) {
    if (!/\D\W\S/.test(password)) return false;
  }
  return true;
};

const rondowNumber = (): string => {
  return Math.floor(Math.random() * 10).toString();
};
const rondowUppercase = (): string => {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26));
};
const rondowLowercase = (): string => {
  return String.fromCharCode(97 + Math.floor(Math.random() * 26));
};
const rondowSymbols = (): string => {
  let state = true;
  let ascii = 0;
  while (state) {
    ascii = 33 + Math.floor(Math.random() * 95);
    if (
      ascii < 48 ||
      (ascii > 57 && ascii < 65) ||
      (ascii > 90 && ascii < 97) ||
      ascii > 122
    ) {
      state = false;
    }
  }
  return String.fromCharCode(ascii);
};
</script>
<style lang="scss" scoped>
.PG {
  &__container {
    height: 100vh;
    overflow: hidden;
    background-color: #3b3b98;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__content {
    background-color: rgba(0, 0, 0, 0.3);
    height: 360px;
    width: 320px;
    box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.3);
    padding: 20px;
  }
  &__title {
    text-align: center;
    color: white;
    font-size: 25px;
    font-weight: bold;
    margin: 20px 0;
  }
  &__password {
    background-color: rgba(0, 0, 0, 0.41);
    color: white;
    height: 50px;
    box-sizing: border-box;
    padding-left: 10px;
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-bottom: 10px;
    position: relative;
    .PG__copy {
      position: absolute;
      display: inline-block;
      right: 10px;
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      background-color: #3b3b98;
      cursor: pointer;
    }
  }
  &__item {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item {
      &__name {
        color: white;
        font-size: 16px;
      }
      &__number {
        outline: none;
      }
    }
  }
  &__submit {
    background-color: #3b3b98;
    color: white;
    border: 0;
    width: 100%;
    height: 35px;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
