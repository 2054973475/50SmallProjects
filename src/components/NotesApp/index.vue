<template>
  <div class="NA__container">
    <div class="NA__add-note" onselectstart="return false" @click="addNote">
      <b style="font-size: 20px">+</b> Add note
    </div>
    <div ref="naContent" class="NA__content">
      <div class="item__conainer" v-for="item in itemList" :key="item.id">
        <div class="item__content">
          <div class="item__header">
            <div class="alter" @click="isAlterNote(item.id)">修改</div>
            <div class="clear" @click="deleteNote(item.id)">删除</div>
          </div>
          <div class="item__body">
            <textarea
              v-model="item.value"
              :disabled="!item.isAlter"
              :style="item.isAlter ? 'height:400px' : 'height:350px'"
              class="item__text"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { uuid } from "vue-uuid";
import { reactive, onMounted, watch } from "vue";
interface ItemList {
  id: string;
  isAlter: boolean;
  value: string;
}
const itemList: ItemList[] = reactive([]);

const addNote = () => {
  itemList.push({
    id: uuid.v1(),
    isAlter: true,
    value: "",
  });
};
const isAlterNote = (id: string) => {
  const index = itemList.findIndex((item) => item.id === id);
  itemList[index].isAlter = !itemList[index].isAlter;
};
const deleteNote = (id: string) => {
  const index = itemList.findIndex((item) => item.id === id);
  itemList.splice(index, 1);
};
onMounted(() => {
  const noteList: ItemList[] | null = JSON.parse(
    window.localStorage.getItem("noteList")!
  );
  if (noteList !== null) {
    noteList.forEach((item) => {
      itemList.push(item);
    });
  }
});
watch(
  () => itemList,
  () => {
    window.localStorage.setItem("noteList", JSON.stringify(itemList));
  },
  {
    deep:true
  }
);
</script>
<style lang="scss" scoped>
.NA {
  &__container {
    height: 100vh;
    padding: 0px 20px;
    background-color: #7bdaf3;
  }
  &__add-note {
    position: absolute;
    right: 20px;
    top: 20px;
    background-color: #9ec862;
    color: white;
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
  }
  &__add-note:active {
    transform: scale(0.95);
  }
  &__content {
    background-color: #7bdaf3;
    position: absolute;
    margin-top: 70px;
    display: flex;
    flex-wrap: wrap;
    .item {
      &__conainer {
        border-radius: 10px;
        height: 450px;
        width: 400px;

        // background-color: white;
        margin-right: 40px;
        margin-bottom: 20px;
      }
      &__content {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      }
      &__header {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: #9ec862;
        height: 40px;
        display: flex;
        justify-content: end;
        align-items: center;
        box-sizing: border-box;
        color: white;
        padding: 10px;
        .alter {
          cursor: pointer;
        }
        .clear {
          cursor: pointer;
          margin-left: 20px;
        }
      }
      &__body {
        background-color: white;
        width: 100%;
        overflow: auto;
      }
      &__text {
        box-sizing: border-box;
        padding: 20px;
        outline: none;
        border: 0;
        height: 400px;
        width: 100%;
        font-size: 20px;
      }
    }
  }
}
</style>
