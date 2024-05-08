<template> 
  <form @submit.prevent="onSubmit">
    <div class="d-flex">
      <div class="flex-grow-1 me-2"> 
        <input 
          class="form-control"
          type="text"
          v-model="todo"
          placeholder="Type new to-do"
        /> 
      </div>
      <button 
        type="submit"
        class="btn btn-primary"
      >
      Add
      </button>
    </div>
    <div v-show="hasError" style="color: red;">
      This field is cannot be empty
    </div>
  </form> 
</template>

<script>
import { getCurrentInstance } from 'vue';
import { ref } from 'vue';
export default { 
  props: {
    todos: {
      type: Array,
      required: []
    }
  },
  emits: ['add-todo'],
  setup() {
		const { emit } = getCurrentInstance();
    const todo = ref(''); 
    const hasError = ref(false); 
    const onSubmit = () => { 
      if(todo.value === '') { 
        hasError.value = true
      }else{  
        emit('add-todo', {
          id: Date.now(),
          subject: todo.value,
          completed: false
        })  
        hasError.value = false
        todo.value = '';
      }
    }
    return {
      todo,
      hasError,
      onSubmit
    }
  }
}
</script>

<style>

</style>