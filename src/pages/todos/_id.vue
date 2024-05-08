<template>  
  <h1>To-Do page</h1>
  <TodoForm :editing="true" />
</template>

<script>
import TodoForm from '@/components/TodoForm.vue'
export default {
  name: 'vue-id',
  components: {
    TodoForm
  },  
}
</script> 
<style>

</style>