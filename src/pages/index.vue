<template> 
  <div>Home Page</div>
  <div>테스트</div>
  <div>{{count}}</div>
  <button @click="count++">Increment</button>
</template>

<script>
import { useCount } from '@/hooks/count'
export default {
  name: 'HomePage',
  setup() {
    const { count } = useCount();
    console.log(count)
    return {
      count
    }
  }
}
</script>

<style>

</style>