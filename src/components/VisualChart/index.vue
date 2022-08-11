<template>
  <div class="visual-chart">
    <div class="visual-chart__aside">
      <a-select
        class="aside__select"
        size="small"
        v-model:value="chartTypeIndex"
      >
        <a-select-option
          v-for="item in chartType"
          :key="item.value"
          :value="item.value"
          >{{ item.label }}</a-select-option
        >
      </a-select>
      <a-button class="aside__button" size="small" shape="round">添加</a-button>
      <a-button class="aside__button" size="small" shape="round">生成</a-button>
      <a-collapse v-model:activeKey="activeNames" class="chart-box">
        <a-collapse-panel
          v-show="chartTypeIndex === 0 || chartTypeIndex === item.id"
          v-for="item in chartList"
          :key="item.id"
          :header="item.title"
        >
          <draggable
            class="dragArea list-group"
            :list="item.chart"
            :group="{ name: 'people', pull: 'clone', put: false }"
            :clone="cloneDog"
            @change="log"
          >
            <div
              class="list-group-item"
              v-for="element in list1"
              :key="element.id"
            >
              {{ element.name }}
            </div>
          </draggable>
          <div
            class="chart-box__chart"
            v-for="chart in item.chart"
            :key="chart.name"
            draggable="true"
          >
            <img :src="chart.src" />
            <div class="chart-box__title">{{ chart.name }}</div>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <div class="visual-chart__container">
      <div class="container__header"></div>
      <draggable class="container__main" :list="showChartList" animation="300">
        <template #item="{ element }">
          <Chart class="chart" />
        </template>
      </draggable>
    </div>
  </div>
</template>
<script lang="ts" setup>
import draggable from "vuedraggable";
import Chart from "./Chart/index.vue";
import { ref, reactive, Ref } from "vue";
import {
  Button as AButton,
  Select as ASelect,
  SelectOption as ASelectOption,
  Collapse as ACollapse,
  CollapsePanel as ACollapsePanel,
} from "ant-design-vue";
let idGlobal = 8;
const chartTypeIndex = <Ref<number>>ref(0);
const chartType = reactive([
  {
    value: 0,
    label: "全部",
  },
  {
    value: 1,
    label: "折线图",
  },
  {
    value: 2,
    label: "饼图",
  },
  {
    value: 3,
    label: "柱状图",
  },
]);

const chartList = reactive([
  {
    id: 1,
    title: "折线图",
    chart: [
      {
        name: "基础折线图",
        src: new URL("./images/line-simple.webp", import.meta.url).href,
      },
      {
        name: "基础面积图",
        src: new URL("./images/area-basic.webp", import.meta.url).href,
      },
      {
        name: "折线图堆叠",
        src: new URL("./images/line-stack.webp", import.meta.url).href,
      },
      {
        name: "堆叠面积图",
        src: new URL("./images/area-stack.webp", import.meta.url).href,
      },
    ],
  },
  {
    id: 2,
    title: "饼图",
    chart: [
      {
        name: "圆角环形图",
        src: new URL("./images/pie-borderRadius.webp", import.meta.url).href,
      },
      {
        name: "基础南丁格尔玫瑰图",
        src: new URL("./images/pie-roseType-simple.webp", import.meta.url).href,
      },
      {
        name: "嵌套环形图",
        src: new URL("./images/pie-nest.webp", import.meta.url).href,
      },
      {
        name: "南丁格尔玫瑰图",
        src: new URL("./images/pie-roseType.webp", import.meta.url).href,
      },
    ],
  },
]);

const activeNames = ref([1]);

const showChartList = reactive([
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
]);

</script>
<style lang="scss" scoped>
.visual-chart {
  background-color: #f1f5f8;
  height: 100vh;
  padding: 20px;
  display: flex;
  box-sizing: border-box;
  &__aside {
    width: 280px;
    border-radius: 5px;
    background-color: white;
    box-sizing: border-box;
    padding: 20px;
    .aside {
      &__select {
        width: 130px;
      }
      &__button {
        background-color: transparent;
        padding: 0 10px;
        border-radius: 20px;
        margin-left: 5px;
        font-size: 12px;
      }
    }
    .ant-collapse {
      border: 0;
    }
    .chart-box {
      margin: 20px 0;
      border-top: 0;
      :deep(.ant-collapse-header) {
        background-color: white;
        font-weight: bold;
      }
      :deep(.ant-collapse-content-box) {
        padding: 0;
        display: flex;
        flex-wrap: wrap;
      }
      &__chart {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        img {
          width: 80px;
        }
      }
      &__title {
        font-size: 12px;
        text-align: center;
        max-width: 80px;
      }
    }
  }
  &__container {
    padding-left: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex: 1;
    .container__header {
      background-color: white;
      height: 50px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .container__main {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-between;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .chart {
        margin-bottom: 15px;
      }
      .chart:nth-last-of-type(1) {
        margin-bottom: 0px;
      }
      .chart:nth-last-of-type(2) {
        margin-bottom: 0px;
      }
    }
  }
}
</style>
