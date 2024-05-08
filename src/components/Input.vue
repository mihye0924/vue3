<template>
  <div class="form-group mb-2">
    <label class="mb-2" for="">
      {{ label }}
    </label>
    <input 
        :value="subject"
        type="text" 
        class="form-control" 
        id="" 
        @input="onInput"
    />
    <div 
      v-if="error" 
      style="color: red;"
    >
      {{ error }}
    </div>
  </div> 
</template>

<script>
import { getCurrentInstance } from 'vue';
export default {
  name: 'vue-input',
  props: {
    label: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '' || false, 
    },
    subject: {
      type: String,
      default: '',
    }
  },
  setup(){
    const { emit } = getCurrentInstance();
    const onInput = (e) => {
      emit('update:subject', e.target.value)
    }
    return {
      onInput
    }
  }
}
</script>

<style scoped>
  .text-red {
    color: red;
  }
</style> 