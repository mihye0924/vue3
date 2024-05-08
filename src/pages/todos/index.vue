<template>
  <div>
    <div class="d-flex justify-content-between mb-3 ">
      <h2>To-Do List</h2> 
      <button 
        class="btn btn-primary"
        @click="moveToCreatePage"
      >
        Create Todo
      </button>
    </div>
    <input 
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="search"
      @keyup.enter="searchTodo"
    /> 
    <hr/>
    <div style="color: red">{{ error }}</div>
    <div v-if="!todos.length" style="color: gray;">
      There is nothing to display
    </div>
    <TodoList 
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo" 
    />
    <br/>
    <Pagination
      v-if="todos.length > 0"
      :numberOfPages="numberOfPages"
      :currentPage="currentPage"
      @click="getTodos"
    />
  </div> 
</template>

<script> 
import { computed, ref, watch } from 'vue'
import TodoList from '@/components/TodoList.vue'
import axios from '@/axios' 
import { useToast } from '@/hooks/toast'
import { useRouter } from 'vue-router'
import Pagination from '@/components/Pagination.vue'
export default {
  name: 'TodosPage',
  components: { 
    TodoList,
    Pagination
  },
  setup () { 
    const todos = ref([]); 
    const router = useRouter();
    const todoStyle = { color: 'gray', textDecoration: 'line-through' } 
    const { showToast, tostMessage, toastAlertType, triggerToast } = useToast();
    const error = ref('');
    const searchText = ref(''); 
    const numberOfTodos = ref(0);
    let limit = 5;
    const currentPage = ref(1); 
    let timeout = null; 
    const addTodo = async(todo) => {
      error.value = '';
      try {
        await axios.post('todos', {
          subject: todo.subject,
          completed: todo.completed
        })  
        getTodos(1) 
      }catch (err) { 
        error.value = err.message;
        triggerToast('Something went wrong', 'danger');
      } 
    }
    const deleteTodo = async(id) => { 
      error.value = '';
      try {
        await axios.delete('todos/' + id);  
        getTodos(1)
      }catch(err) { 
        error.value = err.message;
        triggerToast('Something went wrong', 'danger');  
      }
    }
    const toggleTodo = async(index, checked) => {
      error.value = '';
      try {
        const id = todos.value[index].id;
        await axios.patch('todos/' + id, { 
          completed: checked
        });  
        todos.value[index].completed = checked;
      }catch (err) {
        error.value = err.message;
        triggerToast('Something went wrong', 'danger');
      }
    }
    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    })
    const getTodos = async(page = currentPage.value) => {
      currentPage.value = page;
      error.value = '';
      try {
        const res = await axios.get(`todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`);
        todos.value = res.data;  
        numberOfTodos.value = res.headers['x-total-count']
      } catch (err) {
        error.value = err.message;
        triggerToast('Something went wrong', 'danger');
      }
    } 
    getTodos();
    watch(searchText, () => { 
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        getTodos(1)
      }, 1000);
    })
    const searchTodo = () => {
      clearTimeout(timeout)
      getTodos(1) 
    }  
    const moveToCreatePage = () => {
      router.push({ name: 'TodoCreate' })
    }
    return {  
      todos,
      todoStyle, 
      numberOfPages,
      getTodos,
      addTodo,
      deleteTodo, 
      toggleTodo,
      error,
      searchText,
      currentPage,
      searchTodo, 
      toastAlertType,
      showToast, 
      tostMessage,
      moveToCreatePage
    }
  }
}
</script> 

<style> 
.todo{
   color: gray;
   text-decoration: line-through;
}
</style>
