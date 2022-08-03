<template>
  <div class="drawing-app__container">
    <canvas
      class="drawing-app__canvas"
      ref="myCanvas"
      width="800"
      height="700"
    ></canvas>
    <div class="drawing-app__settings">
      <div class="width-color">
        <div
          class="item"
          @click="ctxLineWidth === 5 ? '' : setCtxLineWidth(false)"
        >
          -
        </div>
        <div class="item">{{ ctxLineWidth }}</div>
        <div
          class="item"
          @click="ctxLineWidth === 50 ? '' : setCtxLineWidth(true)"
        >
          +
        </div>
        <div class="item">
          <input
            ref="canvasColor"
            id="color"
            type="color"
            @click="setCtxLineColor"
            @change="setCtxLineColor"
          />
        </div>
      </div>
      <div class="clear">
        <div class="item" @click="clearCtxLine">X</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Ref, ref, onMounted, onBeforeUnmount } from "vue";
const myCanvas = <Ref<HTMLCanvasElement>>ref();
const ctx = <Ref<CanvasRenderingContext2D | null>>ref();
const canvasColor = <Ref<HTMLInputElement>>ref();
const ctxLineWidth = <Ref<number>>ref(5);
const strokeState = <Ref<boolean>>ref(false);

const setCtxLineWidth = (value: boolean) => {
  ctxLineWidth.value = value ? ctxLineWidth.value + 5 : ctxLineWidth.value - 5;
  ctx.value!.lineWidth = ctxLineWidth.value * 2;
};
const setCtxLineColor = () => {
  ctx.value!.strokeStyle = canvasColor.value.value;
  ctx.value!.beginPath();
  ctx.value!.stroke();
};
const clearCtxLine = () => {
  ctx.value!.clearRect(0, 0, 800, 700);
};

const setCanvas = () => {
  ctx.value = myCanvas.value.getContext("2d");
  ctx.value!.lineCap = "round";
  ctx.value!.lineJoin = "round";
  ctx.value!.lineWidth = ctxLineWidth.value * 2;

  myCanvas.value.addEventListener("mousedown", (event) => {
    ctx.value!.beginPath();
    ctx.value!.moveTo(event.offsetX, event.offsetY);
    strokeState.value = true;
  });
  myCanvas.value.addEventListener("mousemove", (event) => {
    ctx.value!.lineTo(event.offsetX, event.offsetY);
    if (strokeState.value) {
      ctx.value!.stroke();
    }
  });
  myCanvas.value.addEventListener("mouseleave", (event) => {
    strokeState.value = false;
  });
  myCanvas.value.addEventListener("mouseup", () => {
    ctx.value!.stroke();
    strokeState.value = false;
  });
};

onMounted(() => {
  console.log(canvasColor.value.value);
  setCanvas();
});
onBeforeUnmount(() => {
  myCanvas.value.addEventListener("mouseup", () => {
    myCanvas.value.onmouseup = null;
  });
  myCanvas.value.addEventListener("mousedown", () => {
    myCanvas.value.onmousedown = null;
  });
  myCanvas.value.addEventListener("mousemove", () => {
    myCanvas.value.onmousemove = null;
  });
  myCanvas.value.addEventListener("mouseleave", () => {
    myCanvas.value.onmouseleave = null;
  });
});
</script>
<style lang="scss" scoped>
.drawing-app {
  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #f5f5f5;
    align-items: center;
    height: 100vh;
  }
  &__canvas {
    border: 2px solid #4682b4;
  }
  &__settings {
    width: 760px;
    height: 50px;
    background-color: #4682b4;
    border: 2px solid #4682b4;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .width-color {
      display: flex;
    }
    .clear {
    }
    .item {
      height: 55px;
      width: 55px;
      background-color: white;
      margin-left: 10px;
      color: black;
      font-size: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      #color {
        border: none;
        outline: none;
        height: 80%;
      }
    }
  }
}
</style>
