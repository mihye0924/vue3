<template> 
  <div class="modal modal-wrapper"> 
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">
          <slot name="title"/>
        </h5>
        <button 
          type="button" 
          class="btn-close"
          aria-label="Close"
          @click="onClose"
        />
      </div>
      <div class="modal-body">
         <slot name="body"/> 
      </div>
      <div class="modal-footer">
        <button 
          type="button" 
          class="btn btn-secondary"
          @click="onClose"
        >
          Close
        </button>
        <button 
          type="button" 
          class="btn btn-danger"
          @click="onDelete"
        >
          Delete
        </button>
      </div>
    </div>
  </div> 
</div>
</template>

<script>
import { getCurrentInstance } from 'vue';
export default {
  name: 'vue-modal',
  setup(){
     const { emit } = getCurrentInstance();
    const onClose = () => {
      emit('close');
    }
    const onDelete = () => {
      emit('delete');
    }
    return { 
      onClose,
      onDelete
    }
  }
}
</script>

<style scoped>
  .modal-wrapper {
    position: fixed;
    z-index: 100;
    display: block !important;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0, 0.5);
  }
</style>