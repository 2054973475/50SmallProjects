<template>
  <div class="todo-list">
    <div class="todo-list__content">
      <div class="todo-list__header">todos</div>
      <div class="todo-list__body">
        <input
          class="todo-list__input"
          placeholder="Enter your todo"
          v-model="todo"
          @keyup.enter="addTodo"
        />
        <ul class="todo-list__list">
          <li
            class="todo-list__todo"
            :class="item.isDelete ? 'todo-list__todo--delete' : ''"
            v-for="item in todoList"
            :key="item.id"
            @click="deleteTodo(item)"
          >
            {{ item.todo }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { uuid } from "vue-uuid";
import { ref, Ref, reactive, watch, onMounted } from "vue";
interface ToDo {
  id: string;
  todo: string;
  isDelete: boolean;
}
const todo = <Ref<string>>ref("");
const todoList = <ToDo[]>reactive([]);
const addTodo = () => {
  todoList.push({ id: uuid.v1(), todo: todo.value, isDelete: false });
  todo.value = "";
};
const deleteTodo = (item: ToDo) => {
  item.isDelete = !item.isDelete;
};
onMounted(() => {
  if (window.localStorage.getItem("todoList") === null) {
    return;
  }
  console.log(123);
  const data = [...JSON.parse(window.localStorage.getItem("todoList")!)];
  data.forEach((item) => {
    todoList.push(item);
  });
});
watch(
  () => todoList,
  () => {
    console.log(123);
    window.localStorage.setItem("todoList", JSON.stringify(todoList));
  },
  {
    deep: true,
  }
);
</script>
<style scoped lang="scss">
.todo-list {
  background-color: #f5f5f5;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__header {
    // margin-top: 150px;
    color: #dbc7ed;
    font-size: 160px;
    font-weight: bold;
  }
  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
    width: 400px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  }
  &__input {
    width: 400px;
    box-sizing: border-box;
    height: 70px;
    padding: 20px;
    font-size: 30px;
    outline-color: #b383e2;
    border: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  &__input::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
  &__list {
    width: 400px;
  }
  &__todo {
    background-color: white;
    padding: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 30px;
    cursor: pointer;
  }
  &__todo--delete {
    text-decoration: line-through;
    color: rgba(0, 0, 0, 0.2);
  }
  &__todo:last-of-type {
    border-bottom: 0;
  }
}
</style>
