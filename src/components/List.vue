<template>
  <div 
  v-for="(item,index) in items" 
  :key="index"  
  class="card mt-2"
  >
    <slot :item="item" :index="index" />
  </div>
</template>

<script>
export default {
  name: 'vue-list',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>

</style>