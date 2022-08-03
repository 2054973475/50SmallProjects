<template>
  <div class="TC__container">
    <div class="TC__buttom" @click="updateTheme">{{ theme }}</div>
    <div class="TC__clock">
      <div ref="hour" class="clock__hour"></div>
      <div ref="minute" class="clock__minute"></div>
      <div ref="second" class="clock__second"></div>
      <div ref="center" class="clock__center"></div>
      <div class="clock__time">
        {{ time }}
        <p class="clock__smail-time">
          {{ monthWeek }}<span>{{ weekNum }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref, onMounted } from "vue";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);
const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const hour = <Ref<HTMLDivElement>>ref();
const minute = <Ref<HTMLDivElement>>ref();
const second = <Ref<HTMLDivElement>>ref();
const time = <Ref<string>>ref();
const monthWeek = <Ref<string>>ref();
const weekNum = <Ref<number>>ref();
const theme = <Ref<string>>ref("Dark mode");

const updateTheme = () => {
  if (theme.value === "Dark mode") {
    window.document.documentElement.setAttribute("data-theme", "dark");
    theme.value = "Light mode";
  } else {
    window.document.documentElement.setAttribute("data-theme", "light");
    theme.value = "Dark mode";
  }
};

const times = () => {
  requestAnimationFrame(() => {
    weekNum.value = dayjs().isoWeekday();
    const week = weekdays[weekNum.value - 1].toUpperCase();
    const month = monthsShort[dayjs().month()].toUpperCase();
    monthWeek.value = week + "," + month;

    time.value = dayjs().format("hh:mm  A");

    let hourtime = dayjs().hour() > 12 ? dayjs().hour() - 12 : dayjs().hour();
    hourtime = hourtime + dayjs().minute() / 60 + dayjs().second() / 60 / 60;
    const minutetime = dayjs().minute() + dayjs().second() / 60;
    hour.value.style.transform = `rotate(${(hourtime / 12) * 360 - 90}deg)`;
    minute.value.style.transform = `rotate(${(minutetime / 60) * 360 - 90}deg)`;
    second.value.style.transform = `rotate(${
      (dayjs().second() / 60) * 360 - 90
    }deg)`;
    times();
  });
};

onMounted(() => {
  window.document.documentElement.setAttribute("data-theme", "light");
  times();
});
</script>
<style lang="scss" scoped>
@import "./handle.scss";
.TC {
  &__container {
    height: 100vh;
    @include background-color("background_color1");
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s linear;
  }
  &__buttom {
    @include font_color("font_color2");
    position: absolute;
    top: 20%;
    @include hour_color("hour_color1");
    padding: 8px 16px;
    border-radius: 5px;
    transition: all 0.2s linear;
  }
  &__clock {
    position: relative;
    display: flex;
    justify-content: center;
    .clock {
      width: 400px;
      height: 400px;
      &__hour {
        height: 3px;
        width: 70px;
        @include hour_color("hour_color1");
        position: absolute;
        transform-origin: 0 50%;
        top: 50%;
        left: 50%;
        transition: all 0.2s linear;
        transform: translateY(-50%);
      }
      &__minute {
        height: 3px;
        width: 100px;
        @include hour_color("hour_color1");
        position: absolute;
        transform-origin: 0 50%;
        top: 50%;
        left: 50%;
        transition: all 0.2s linear;
        transform: translateY(-50%);
      }
      &__second {
        height: 3px;
        width: 100px;
        background-color: #e74c3c;
        position: absolute;
        transform-origin: 0 50%;
        top: 50%;
        left: 50%;
        transition: all 0.2s linear;
        transform: translateY(-50%);
      }
      &__center {
        position: absolute;
        border: 3px solid #e74c3c;
        height: 4px;
        width: 4px;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transition: all 0.2s linear;
        transform: translate(-50%, -50%);
        @include hour_color("hour_color1");
      }
      &__time {
        margin-top: 300px;
        @include font_color("font_color1");
        font-size: 60px;
        text-align: center;
        transition: all 0.2s linear;
      }
      &__smail-time {
        margin-top: 20px;
        font-size: 14px;
        @include font_color("font_color3");
        transition: all 0.2s linear;
        span {
          margin-left: 5px;
          @include hour_color("hour_color1");
          @include font_color("font_color2");
          padding: 2px 6px;
          border-radius: 50%;
          transition: all 0.2s linear;
        }
      }
    }
  }
}
</style>
